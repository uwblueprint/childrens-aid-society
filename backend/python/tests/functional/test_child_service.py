import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.address import Address
from app.models.caregiver import Caregiver
from app.models.child import Child
from app.models.daytime_contact import DaytimeContact
from app.models.intake import Intake
from app.models.user import User
from app.resources.child_dto import ChildDTO, CreateChildDTO
from app.services.implementations.child_service import ChildService

DUMMY_DAYTIME_CONTACT_DATA = {
    "contact_first_name": "Hamzaa",
    "contact_last_name": "Yusuff",
    "phone_number": "8790832",
    "type": "SCHOOL",
}

DUMMY_INTAKE_DATA = {
    "id": 1,
}

DUMMY_USER_DATA = {
    "id": 1,
    "first_name": "Hamza",
    "last_name": "Yusuff",
    "auth_id": "hbyusuff",
    "role": "Driver",
    "branch": "ALGOMA",
}

DUMMY_DAYTIME_CONTACT_DATA = {
    "id": 1,
    "contact_first_name": "Hamza",
    "contact_last_name": "Yusuff",
    "phone_number": "8790832",
    "type": "SCHOOL",
}

DUMMY_ADDRESS_DATA = {
    "street_address": "Lester Street",
    "city": "waterloo",
    "postal_code": "N2L3W6",
}


@pytest.fixture
def child_service():
    child_service = ChildService(current_app.logger)
    seed_database()
    yield child_service
    empty_database()


def seed_database():
    dummy_intake = Intake(**DUMMY_INTAKE_DATA)
    db.session.add(dummy_intake)
    db.session.commit()

    dummy_user = User(**DUMMY_USER_DATA)
    db.session.add(dummy_user)
    db.session.commit()

    dummy_address = Address(**DUMMY_ADDRESS_DATA)
    db.session.add(dummy_address)
    db.session.commit()

    DUMMY_DAYTIME_CONTACT_DATA["address_id"] = dummy_address.id
    dummy_daytime_contact = DaytimeContact(**DUMMY_DAYTIME_CONTACT_DATA)
    db.session.add(dummy_daytime_contact)
    db.session.commit()


def empty_database():
    Child.query.delete()
    Intake.query.delete()
    DaytimeContact.query.delete()
    Address.query.delete()
    User.query.delete()


def test_add_new_child_valid(child_service):
    param = CreateChildDTO(
        intake_id=1,
        first_name="Test",
        last_name="Child",
        date_of_birth=datetime.date(2020, 5, 17),
        cpin_number="1",
        child_service_worker_id=1,
        daytime_contact_id=1,
        special_needs="None",
        has_foster_placement=True,
        has_kinship_provider=False,
    )
    child_instance = child_service.add_new_child(param)
    param.id = child_instance.id
    assert type(child_instance) is ChildDTO
    assert child_instance.__dict__ == param.__dict__


def test_nullable_false_case(child_service):
    param = CreateChildDTO(
        first_name="Test",
        last_name="Child",
        child_service_worker_id=1,
        daytime_contact_id=1,
        special_needs="None",
        has_foster_placement=True,
        has_kinship_provider=False,
    )
    child_instance = child_service.add_new_child(param)
    param.id = child_instance.id
    assert type(child_instance) is ChildDTO
    assert child_instance.__dict__ == param.__dict__


def test_null_case(child_service):
    with pytest.raises(Exception):
        child_service.add_new_child(None)


def test_empty_input_string(child_service):
    param = CreateChildDTO(
        first_name="Test",
        last_name="",
        child_service_worker_id=1,
        daytime_contact_id=1,
        special_needs="None",
        has_foster_placement=True,
        has_kinship_provider=False,
    )
    with pytest.raises(Exception):
        child_service.add_new_child(param)


def test_missing_field(child_service):
    param = CreateChildDTO(
        last_name="Child",
        child_service_worker_id=1,
        daytime_contact_id=1,
        special_needs="None",
        has_foster_placement=True,
        has_kinship_provider=False,
    )
    with pytest.raises(Exception):
        child_service.add_new_child(param)