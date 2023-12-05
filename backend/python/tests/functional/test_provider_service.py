import pytest
from flask import current_app

from app.models import db
from app.models.child import Child
from app.models.daytime_contact import DaytimeContact
from app.models.provider import Provider
from app.models.user import User
from app.resources.provider_dto import CreateProviderDTO, ProviderDTO
from app.services.implementations.provider_service import ProviderService

DEFAULT_USER = {
    "id": 1,
    "first_name": "Jane",
    "last_name": "Doe",
    "auth_id": "1234567890",
    "role": "User",
    "branch": "ALGOMA",
}

DEFAULT_DAYTIME_CONTACT = {
    "id": 1,
    "name": "Jane Doe",
    "address": "123 Main St",
    "contact_information": "1234567890",
}

DEFAULT_CHILD = {
    "id": 1,
    "name": "Jane Doe",
    "service_worker": "Worker",
    "daytime_contact_id": 1,
    "special_needs": "None",
}

DEFAULT_PROVIDER = {
    "name": "Jane Doe",
    "file_number": "1234567890",
    "primary_phone_number": "1234567890",
    "secondary_phone_number": "1234567890",
    "address": "123 Main St",
    "relationship_to_child": "Mother",
}


@pytest.fixture
def provider_service():
    provider_service = ProviderService(current_app.logger)
    seed_database()
    yield provider_service
    teardown_database()


def seed_database():
    user = User(**DEFAULT_USER)
    db.session.add(user)
    db.session.commit()

    daytime_contact = DaytimeContact(**DEFAULT_DAYTIME_CONTACT)
    db.session.add(daytime_contact)
    db.session.commit()

    child = Child(**DEFAULT_CHILD)
    db.session.add(child)
    db.session.commit()

    provider = Provider(**DEFAULT_PROVIDER)
    db.session.add(provider)
    db.session.commit()


def teardown_database():
    db.session.query(Provider).delete()
    db.session.query(Child).delete()
    db.session.query(User).delete()
    db.session.query(DaytimeContact).delete()
    db.session.execute("ALTER SEQUENCE providers_id_seq RESTART WITH 1")
    db.session.execute("ALTER SEQUENCE children_id_seq RESTART WITH 1")
    db.session.execute("ALTER SEQUENCE daytime_contacts_id_seq RESTART WITH 1")
    db.session.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    db.session.commit()


def test_create_new_provider_valid(provider_service):
    param = CreateProviderDTO(
        name="John Doe",
        file_number="0987654321",
        primary_phone_number="0987654321",
        secondary_phone_number="0987654321",
        address="321 Main St",
        relationship_to_child="Father",
    )

    provider_instance = provider_service.create_new_provider(param)
    param.id = provider_instance.id
    assert type(provider_instance) is ProviderDTO
    assert provider_instance.__dict__ == param.__dict__


def test_null_case(provider_service):
    with pytest.raises(Exception):
        provider_service.create_new_provider(None)


def test_invalid_arg(provider_service):
    param = CreateProviderDTO(
        name="",  # name cannot be empty
        file_number="0987654321",
        primary_phone_number="0987654321",
        secondary_phone_number="0987654321",
        address="321 Main St",
        relationship_to_child="Father",
    )
    with pytest.raises(Exception):
        provider_service.create_new_provider(param)


def test_missing_field(provider_service):
    param = CreateProviderDTO(name="John Doe")  # missing some required fields
    with pytest.raises(Exception):
        provider_service.create_new_provider(param)


def test_delete_success(provider_service):
    provider_service.delete_provider(1)
    assert db.session.query(Provider).filter_by(id=1).first() is None


def test_delete_nonexistent_id_failure(provider_service):
    with pytest.raises(Exception):
        provider_service.delete_provider(999)
