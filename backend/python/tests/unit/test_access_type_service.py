import pytest
from flask import current_app

from app.models import db
from app.models.access_type import AccessType
from app.resources.access_type_dto import AccessTypeDTO
from app.services.implementations.access_type_service import AccessTypeService


@pytest.fixture
def access_type_service():
    access_type_service = AccessTypeService(current_app.logger)
    seed_database()
    yield access_type_service
    AccessType.query.delete()


DEFAULT_ACCESS_TYPES = [
    {"access_type": "TWICE_WEEKLY"},
    {"access_type": "WEEKLY_ANY_TIME"},
    {"access_type": "WEEKLY_AFTER_SCHOOL"},
    {"access_type": "VIRTUAL"},
]

# TODO: remove this step when migrations are configured to run against test db
def seed_database():
    access_type_instances = [AccessType(**data) for data in DEFAULT_ACCESS_TYPES]
    db.session.bulk_save_objects(access_type_instances)
    db.session.commit()


def test_get_access_type_id_success(access_type_service):
    res = access_type_service.get_access_type("TWICE_WEEKLY")
    assert type(res) is AccessTypeDTO
    assert res.access_type == "TWICE_WEEKLY"


def test_add_new_access_type(access_type_service):
    res = access_type_service._add_new_access_type("MONTHLY")
    assert type(res) is AccessTypeDTO
    assert AccessType.query.get(res.id).access_type == "MONTHLY"


def test_get_access_type_populates_nonexisting_field(access_type_service):
    res = access_type_service.get_access_type("WEEKLY")
    assert type(res) is AccessTypeDTO
    assert AccessType.query.get(res.id).access_type == "WEEKLY"


def test_get_access_type_invalid_arg_raises_exception(access_type_service):
    with pytest.raises(Exception):
        access_type_service.get_access_type(3143)


def test_get_access_type_null_arg_raises_exception(access_type_service):
    with pytest.raises(Exception):
        access_type_service.get_access_type(None)
