import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.intake import Intake
from app.models.user import User
from app.resources.intake_dto import CreateIntakeDTO, IntakeDTO
from app.services.implementations.intake_service import IntakeService


@pytest.fixture
def intake_service():
    intake_service = IntakeService(current_app.logger)
    seed_database()
    yield intake_service
    empty_database()


DEFAULT_USER = {
    "first_name": "Jane",
    "last_name": "Doe",
    "auth_id": "1234567890",
    "role": "User",
    "branch": "ALGOMA",
}

DEFAULT_INTAKE = {
    "user_id": 1,
    "referring_worker_name": "Jane Doe",
    "referring_worker_contact": "1234567890",
    "referral_date": datetime.date(2020, 1, 1),
    "family_name": "Doe",
    "cpin_number": "1234567890",
    "cpin_file_type": "INVESTIGATION",
    "court_status": "OTHER",
    "court_order_file": "1234567890",
    "transportation_requirements": "1234567890",
    "scheduling_requirements": "1234567890",
    "suggested_start_date": datetime.date(2020, 1, 1),
}


def seed_database():
    user = User(**DEFAULT_USER)
    db.session.add(user)
    db.session.commit()
    intake = Intake(**DEFAULT_INTAKE)
    db.session.add(intake)
    db.session.commit()


def empty_database():
    db.session.query(Intake).delete()
    db.session.execute("ALTER SEQUENCE intakes_id_seq RESTART WITH 1")
    db.session.commit()
    db.session.query(User).delete()
    db.session.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    db.session.commit()


def test_create_intake_valid(intake_service):
    param = CreateIntakeDTO(
        id=2,
        user_id=1,
        intake_status="IN_PROGRESS",
        referring_worker_name="Jane Doe",
        referring_worker_contact="1234567890",
        referral_date=datetime.date(2020, 1, 1),
        family_name="Doe",
        cpin_number="1234567890",
        cpin_file_type="INVESTIGATION",
        court_status="OTHER",
        court_order_file="1234567890",
        transportation_requirements="1234567890",
        scheduling_requirements="1234567890",
        suggested_start_date=datetime.date(2020, 1, 1),
    )

    intake_instance = intake_service.create_intake(param)
    param.id = intake_instance.id
    assert type(intake_instance) is IntakeDTO
    assert intake_instance.__dict__ == param.__dict__


def test_null_case(intake_service):
    with pytest.raises(Exception):
        intake_service.create_intake(None)


def test_empty_input_string(intake_service):
    param = CreateIntakeDTO(
        id=2,
        user_id=1,
        referring_worker_name="",  # cannot be empty
        referring_worker_contact="1234567890",
        referral_date="2020-01-01",
        family_name="Doe",
        cpin_number="1234567890",
        cpin_file_type="INVESTIGATION",
        court_status="OTHER",
        court_order_file="1234567890",
        transportation_requirements="1234567890",
        scheduling_requirements="1234567890",
        suggested_start_date=datetime.date(2020, 1, 1),
    )
    with pytest.raises(Exception):
        intake_service.create_intake(param)


def test_missing_field(intake_service):
    param = CreateIntakeDTO(id=2)  # missing some required fields
    with pytest.raises(Exception):
        intake_service.create_intake(param)
