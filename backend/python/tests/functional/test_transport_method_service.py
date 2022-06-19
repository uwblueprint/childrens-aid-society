import pytest
from flask import current_app

from app.models import db
from app.models.transportation_method import TransportationMethod
from app.resources.transportation_method_dto import TransportationMethodDTO
from app.services.implementations.transport_method_service import (
    TransportationMethodService,
)


@pytest.fixture
def transport_method_service():
    transport_method_service = TransportationMethodService(current_app.logger)
    seed_database()
    yield transport_method_service
    TransportationMethod.query.delete()


DEFAULT_TRANSPORTATION_METHODS = (
    {"transportation_method": "AGENCY DRIVER"},
    {"transportation_method": "KIN PROVIDER"},
    {"transportation_method": "FOSTER PARENT"},
)


# TODO: remove this step when migrations are configured to run against test db
def seed_database():
    transportation_method_instances = [
        TransportationMethod(**data) for data in DEFAULT_TRANSPORTATION_METHODS
    ]
    db.session.bulk_save_objects(transportation_method_instances)


def test_get_transport_method_fetches_existing_method(transport_method_service):
    res = transport_method_service._get_transport_method("Agency Driver")
    assert type(res) is TransportationMethodDTO
    assert res.transportation_method == "AGENCY DRIVER"


def test_get_transport_method_creates_new_transport(transport_method_service):
    res = transport_method_service._get_transport_method("New Driver")
    assert type(res) is TransportationMethodDTO
    assert TransportationMethod.query.get(res.id).transportation_method == "NEW DRIVER"


def test_get_transport_method_raises_exception_null_argument(
    transport_method_service,
):
    with pytest.raises(Exception):
        transport_method_service._get_transport_method(None)


def test_get_transport_method_raises_exception_invalid_argument(
    transport_method_service,
):
    with pytest.raises(Exception):
        transport_method_service._get_transport_method(12345)
