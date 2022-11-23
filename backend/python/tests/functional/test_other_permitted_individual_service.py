import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.intake import Intake
from app.models.other_permitted_individual import OtherPermittedIndividual
from app.models.user import User
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


USER_DATA = {
    "first_name": "John",
    "last_name": "Doe",
    "auth_id": "auth0|123456789",
    "role": "User",
    "branch": "ALGOMA",
}

INTAKE_DATA = {
    "user_id": 1,
    "referring_worker_name": "John Doe",
    "referring_worker_contact": "johndoe@mail.com",
    "referral_date": datetime.date(2020, 1, 1),
    "family_name": "Doe",
    "cpin_number": "123456789",
    "cpin_file_type": "ONGOING",
    "court_status": "OTHER",
    "court_order_file": "court_order.pdf",
    "transportation_requirements": "car",
    "scheduling_requirements": "flexible",
    "suggested_start_date": datetime.date(2020, 1, 1),
}

OPI_DATA = {
    "name": "Jim Halpert",
    "phone_number": "1234567890",
    "relationship_to_child": "sales",
    "notes": "note note note",
    "intake_id": 1,
}


def seed_database():
    user = User(**USER_DATA)
    db.session.add(user)
    db.session.commit()

    intake = Intake(**INTAKE_DATA)
    db.session.add(intake)
    db.session.commit()

    opi = OtherPermittedIndividual(**OPI_DATA)
    db.session.add(opi)
    db.session.commit()


def teardown_database():
    OtherPermittedIndividual.query.delete()
    Intake.query.delete()
    User.query.delete()
    db.session.execute(
        "ALTER SEQUENCE other_permitted_individuals_id_seq RESTART WITH 1"
    )
    db.session.execute("ALTER SEQUENCE intakes_id_seq RESTART WITH 1")
    db.session.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    db.session.commit()


def test_normal_case(opi_service):
    param = CreateOtherPermittedIndividualDTO(
        name="Angela Martin",
        phone_number="1234567890",
        relationship_to_child="accounting",
        notes="note note note",
        intake_id=1,
    )
    opi_instance = opi_service.create_new_other_permitted_individual(param)
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


def test_delete_existing_success(opi_service):
    opi_service.delete_other_permitted_individual(1)
    assert OtherPermittedIndividual.query.get(1) is None


def test_delete_non_existing(opi_service):
    with pytest.raises(Exception):
        opi_service.delete_other_permitted_individual(999)
