import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.address import Address
from app.models.caregiver import Caregiver
from app.models.child import Child
from app.models.daytime_contact import DaytimeContact
from app.models.user import User
from app.resources.caregiver_dto import CaregiverDTO, CreateCaregiverDTO
from app.services.implementations.caregiver_service import CaregiverService


@pytest.fixture
def caregiver_service():
    caregiver = CaregiverService(current_app.logger)
    seed_database()
    yield caregiver
    teardown_database()
    Caregiver.query.delete()


DUMMY_USER_DATA = {
    "first_name": "Hamza",
    "last_name": "Yusuff",
    "auth_id": "hbyusuff",
    "role": "User",
    "branch": "ALGOMA",
}
DUMMY_ADDRESS_DATA = {
    "street_address": "Lester Street",
    "city": "waterloo",
    "postal_code": "N2L3W6",
}
DUMMY_DAYTIME_CONTACT_DATA = {
    "contact_first_name": "Hamza",
    "contact_last_name": "Yusuff",
    "phone_number": "8790832",
    "type": "SCHOOL",
}
DUMMY_CHILD_DATA = {
    "first_name": "Hamza",
    "last_name": "Yusuff",
    "child_service_worker_id": 1,
    "daytime_contact_id": 1,
    "special_needs": "None",
    "has_kinship_provider": False,
    "has_foster_placement": False,
}


def seed_database():
    new_user = User(**DUMMY_USER_DATA)
    db.session.add(new_user)
    db.session.commit()

    new_address = Address(**DUMMY_ADDRESS_DATA)
    db.session.add(new_address)
    db.session.commit()

    DUMMY_DAYTIME_CONTACT_DATA["address_id"] = new_address.id
    new_daytime_contact = DaytimeContact(**DUMMY_DAYTIME_CONTACT_DATA)
    db.session.add(new_daytime_contact)
    db.session.commit()

    DUMMY_CHILD_DATA["child_service_worker_id"] = new_user.id
    DUMMY_CHILD_DATA["daytime_contact_id"] = new_daytime_contact.id
    new_child = Child(**DUMMY_CHILD_DATA)
    db.session.add(new_child)
    db.session.commit()


def teardown_database():
    Caregiver.query.delete()
    Child.query.delete()
    DaytimeContact.query.delete()
    Address.query.delete()
    User.query.delete()


class TestCreateCaregiverValid:
    def test_normal_case(self, caregiver_service):
        param = CreateCaregiverDTO(
            type="CAREGIVER",
            first_name="Hamza",
            last_name="Yusuff",
            is_primary=False,
            child_id=1,
            relationship_to_child="FOSTER_CAREGIVER",
            phone_number="012442343",
            cpin_number="123",
            date_of_birth=datetime.datetime(day=27, month=11, year=2001),
            special_needs="None",
            name_of_child="Hisan",
            kinship_worker_name="Blueprint",
            kinship_worker_ext="CS",
            foster_care_coord_name="MathSoc",
            foster_care_coord_ext="EntSoc",
            limitations_for_access="UWPM",
        )
        caregiver_instance = caregiver_service.create_caregiver(param)
        assert type(caregiver_instance) is CaregiverDTO

    def test_nullable_false_case(self, caregiver_service):
        param = CreateCaregiverDTO(
            type="CAREGIVER",
            first_name="Hamza",
            last_name="Yusuff",
            child_id=2,
            relationship_to_child="KINSHIP_CAREGIVER",
            phone_number="012442343",
        )
        caregiver_instance = caregiver_service.create_caregiver(param)
        assert type(caregiver_instance) is CaregiverDTO


class TestCreateCaregiverInvalidFails:
    def test_missing_field(self, caregiver_service):
        param = CreateCaregiverDTO(
            type="PROVIDER",
            first_name="Hamza",
            child_id=1,
            relationship_to_child="DAD",
            phone_number="980332434",
        )
        with pytest.raises(Exception):
            caregiver_service.create_caregiver(param)

    def test_empty_input_string(self):
        param = CreateCaregiverDTO(
            type="PROVIDER",
            first_name="Hamza",
            last_name="",
            child_id=1,
            relationship_to_child="DAD",
            phone_number="980332434",
        )
        with pytest.raises(Exception):
            caregiver_service.create_caregiver(param)

    def test_empty_param(self):
        with pytest.raises(Exception):
            caregiver_service.create_caregiver(None)
