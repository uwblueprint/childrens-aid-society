import pytest
from flask import current_app

from app.models import db
from app.models.address import Address
from app.models.caregiver import Caregiver
from app.models.child import Child
from app.models.daytime_contact import DaytimeContact
from app.resources.caregiver_dto import CaregiverDTO, CreateCaregiverDTO
from app.services.implementations.caregiver_service import CaregiverService


@pytest.fixture
def caregiver_service():
    caregiver = CaregiverService(current_app.logger)
    seed_database()
    yield caregiver
    Caregiver.query.delete()


DUMMY_USER_DATA = {
    "id": 1,
    "first_name": "Hamza",
    "last_name": "Yusuff",
    "auth_id": "hbyusuff",
    "role": "Driver",
    "branch": "ALGOMA",
}

DUMMY_ADDRESS_DATA = {
    "id": 1,
    "street_address": "Lester Street",
    "city": "waterloo",
    "postal_code": "N2L3W6",
}

DUMMY_DAYTIME_CONTACT_DATA = {
    "id": 1,
    "contact_first_name": "Hamza",
    "contact_last_name": "Yusuff",
    "address_id": 1,
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
    dummy_method_instances = [
        Child(**DUMMY_CHILD_DATA),
        Address(**DUMMY_ADDRESS_DATA),
        DaytimeContact(**DUMMY_DAYTIME_CONTACT_DATA),
    ]
    for dummy in dummy_method_instances:
        db.session.add(dummy)
    db.session.commit()


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
