import pytest
from flask import current_app

from app.models import db
from app.models.address import Address
from app.models.daytime_contact import DaytimeContact
from app.resources.daytime_contact_dto import CreateDaytimeContactDTO, DaytimeContactDTO
from app.services.implementations.daytime_contact_service import DaytimeContactService

DUMMY_ADDRESS_DATA = {
    "street_address": "Lester Street",
    "city": "waterloo",
    "postal_code": "N2L3W6",
}

DEFAULT_DAYTIME_CONTACT = {
    "name": "Juthika Hoque",
    "contact_information": "1234567890",
    "dismissal_time": "12:00PM",
}


@pytest.fixture
def daytime_contact_service():
    daytime_contact_service = DaytimeContactService(current_app.logger)
    seed_database()
    yield daytime_contact_service
    empty_database()


def seed_database():
    dummy_address = Address(**DUMMY_ADDRESS_DATA)
    db.session.add(dummy_address)
    db.session.commit()

    DEFAULT_DAYTIME_CONTACT["address_id"] = dummy_address.id
    dummy_daytime_contact = DaytimeContact(**DEFAULT_DAYTIME_CONTACT)
    db.session.add(dummy_daytime_contact)
    db.session.commit()


def empty_database():
    DaytimeContact.query.delete()
    Address.query.delete()


def test_create_new_daytime_contact_valid(daytime_contact_service):
    param = CreateDaytimeContactDTO(
        name="Juthika Hoque",
        contact_information="1234567890",
        dismissal_time="1:00PM",
        address_id=DEFAULT_DAYTIME_CONTACT["address_id"],
    )

    daytime_contact_instance = daytime_contact_service.create_new_daytime_contact(param)
    param.id = daytime_contact_instance.id
    assert type(daytime_contact_instance) is DaytimeContactDTO
    assert daytime_contact_instance.__dict__ == param.__dict__


def test_null_case(daytime_contact_service):
    with pytest.raises(Exception):
        daytime_contact_service.create_new_daytime_contact(None)


def test_empty_input_string(daytime_contact_service):
    param = CreateDaytimeContactDTO(
        name="Test",
        dismissal_time="",
        contact_information="1321412424",
        address_id=DEFAULT_DAYTIME_CONTACT["address_id"],
    )
    with pytest.raises(Exception):
        daytime_contact_service.create_new_daytime_contact(param)


def test_missing_field(daytime_contact_service):
    param = CreateDaytimeContactDTO(name="Hoque", contact_information="1321412424")
    with pytest.raises(Exception):
        daytime_contact_service.create_new_daytime_contact(param)
