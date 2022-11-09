import pytest
from flask import current_app

from app.models import db
from app.models.intake import Intake
from app.models.other_permitted_individual import OtherPermittedIndividual
from app.resources.other_permitted_individual_dto import (
    CreateOtherPermittedIndividualDTO,
    OtherPermittedIndividualDTO,
)
from app.services.implementations.other_permitted_individual_service import (
    OtherPermittedIndividualService,
)

# opi = other permitted individual


@pytest.fixture
def opi_service():
    opi = OtherPermittedIndividualService(current_app.logger)
    seed_database()
    yield opi
    teardown_database()
    OtherPermittedIndividual.query.delete()


INTAKE_DATA = {
    # todo
}

OPI_DATA = {
    "name": "Jim Halpert",
    "phone_number": "1234567890",
    "relationship_to_child": "sales",
    "notes": "note note note",
    "intake_id": 1,
}


def seed_database():
    intake = Intake(**INTAKE_DATA)
    db.session.add(intake)
    db.session.commit()

    opi = OtherPermittedIndividual(**OPI_DATA)
    db.session.add(opi)
    db.session.commit()


def teardown_database():
    OtherPermittedIndividual.query.delete()
    Intake.query.delete()
    db.session.commit()

    db.session.execute(
        "ALTER SEQUENCE other_permitted_individual_id_seq RESTART WITH 1"
    )
    db.session.commit()

    db.session.execute("ALTER SEQUENCE intake_id_seq RESTART WITH 1")
    db.session.commit()


def test_normal_case(self, caregiver_service):
    param = CreateOtherPermittedIndividualDTO(
        name="Angela Martin",
        phone_number="1234567890",
        relationship_to_child="accounting",
        notes="note note note",
        intake_id=1,
    )
    opi_instance = opi_service.create_opi(param)
    assert type(opi_instance) is OtherPermittedIndividualDTO


def test_null_case(opi_service):
    with pytest.raises(Exception):
        opi_service.create_new_other_permitted_individual(None)


def test_empty_input_string(opi_service):
    param = CreateOtherPermittedIndividualDTO(
        name="",  # name cannot be empty
        phone_number="1234567890",
        relationship_to_child="accounting",
        notes="note note note",
        intake_id=1,
    )
    with pytest.raises(Exception):
        opi_service.create_new_other_permitted_individual(param)


def test_missing_field(opi_service):
    param = CreateOtherPermittedIndividualDTO(
        name="Angela Martin",
        # some required fields are missing
    )
    with pytest.raises(Exception):
        opi_service.create_new_other_permitted_individual(param)
