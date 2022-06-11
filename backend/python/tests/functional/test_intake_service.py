import pytest
from flask import current_app

from app.models import db
from app.models.transportation_methods import TransportationMethod
from app.resources.transportation_method_dto import TransportationMethodDTO
from app.services.implementations.intake_service import IntakeService


@pytest.fixture
def intake_service():
    intake_service = IntakeService(current_app.logger)
    seed_database()
    yield intake_service
    TransportationMethod.query.delete()


DEFAULT_TRANSPORTATION_METHODS = (
    {"transportation_method": "Agency Driver"},
    {"transportation_method": "Kin Provider"},
    {"transportation_method": "Foster Parent"},
)


# TODO: remove this step when migrations are configured to run against test db
def seed_database():
    transportation_method_instances = [
        TransportationMethod(**data) for data in DEFAULT_TRANSPORTATION_METHODS
    ]
    db.session.bulk_save_objects(transportation_method_instances)


def test_get_transport_method_id_fetches_existing_method_id(intake_service):
    res = intake_service._get_transport_method_id("Agency Driver")
    assert type(res) is TransportationMethodDTO
    assert res.id == 1


def test_get_transport_method_id_creates_new_transport(intake_service):
    res = intake_service._get_transport_method_id("New Driver")
    assert type(res) is TransportationMethodDTO
    assert TransportationMethod.query.get(res.id).transportation_method == "New Driver"


def test_get_transport_method_id_raises_exception_invalid_argument(intake_service):
    with pytest.raises(Exception):
        intake_service._get_transport_method_id(None)
