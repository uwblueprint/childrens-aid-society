import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.caregiver import Caregiver
from app.models.intake import Intake
from app.models.user import User
from app.resources.caregiver_dto import CaregiverDTO, CreateCaregiverDTO
from app.services.implementations.caregiver_service import CaregiverService


@pytest.fixture
def caregiver_service():
    caregiver = CaregiverService(current_app.logger)
    seed_database()
    yield caregiver
    teardown_database()


DUMMY_USER_DATA = {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "auth_id": "auth0|123456789",
    "role": "User",
    "branch": "ALGOMA",
}

DUMMY_INTAKE_DATA = {
    "id": 1,
    "user_id": 1,
    "referring_worker_name": "John Doe",
    "referring_worker_contact": "johndoe@mail.com",
    "referral_date": "2020-01-01",
    "family_name": "Doe",
    "cpin_number": "123456789",
    "cpin_file_type": "ONGOING",
    "court_status": "OTHER",
    "court_order_file": "court_order.pdf",
    "transportation_requirements": "car",
    "scheduling_requirements": "flexible",
    "suggested_start_date": "2020-01-01",
}

DUMMY_CAREGIVER_DATA = {
    "name": "John Doe",
    "date_of_birth": "1999-01-01",
    "primary_phone_number": "1234567890",
    "secondary_phone_number": "2345678901",
    "email": "test123@uwaterloo.ca",
    "address": "123 Fake Street",
    "relationship_to_child": "FOSTER_CAREGIVER",
    "intake_id": 1,
}


def seed_database():
    user = User(**DUMMY_USER_DATA)
    intake = Intake(**DUMMY_INTAKE_DATA)
    caregiver = Caregiver(**DUMMY_CAREGIVER_DATA)
    db.session.add(user)
    db.session.commit()
    db.session.add(intake)
    db.session.commit()
    db.session.add(caregiver)
    db.session.commit()


def teardown_database():
    Caregiver.query.delete()
    Intake.query.delete()
    User.query.delete()
    db.session.execute("ALTER SEQUENCE caregivers_id_seq RESTART WITH 1")
    db.session.execute("ALTER SEQUENCE intakes_id_seq RESTART WITH 1")
    db.session.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    db.session.commit()


class TestCreateCaregiverValid:
    def test_normal_case(self, caregiver_service):
        param = CreateCaregiverDTO(
            name="Hamza Yusuff",
            date_of_birth="1999-01-01",
            primary_phone_number="1234567890",
            secondary_phone_number="2345678901",
            email="test123@uwaterloo.ca",
            address="1234 Lester Street",
            relationship_to_child="FOSTER_CAREGIVER",
            intake_id=1,
        )
        caregiver_instance = caregiver_service.create_caregiver(param)
        assert type(caregiver_instance) is CaregiverDTO

    def test_nullable_false_case(self, caregiver_service):
        # include only the required fields
        param = CreateCaregiverDTO(
            name="Hamza Yusuff",
            date_of_birth="1999-01-01",
            primary_phone_number="1234567890",
            email="test123@uwaterloo.ca",
            address="1234 Lester Street",
            relationship_to_child="FOSTER_CAREGIVER",
            intake_id=1,
        )
        caregiver_instance = caregiver_service.create_caregiver(param)
        assert type(caregiver_instance) is CaregiverDTO


class TestCreateCaregiverInvalidFails:
    def test_missing_field(self, caregiver_service):
        # missing "name", a required field
        param = CreateCaregiverDTO(
            date_of_birth="1999-01-01",
            primary_phone_number="1234567890",
            email="test123@uwaterloo.ca",
            address="1234 Lester Street",
            relationship_to_child="FOSTER_CAREGIVER",
            intake_id=1,
        )
        with pytest.raises(Exception):
            caregiver_service.create_caregiver(param)

    def test_empty_input_string(self):
        # empty string for "name", which fails the regex check
        param = CreateCaregiverDTO(
            name="",
            date_of_birth="1999-01-01",
            primary_phone_number="1234567890",
            secondary_phone_number="2345678901",
            email="test123@uwaterloo.ca",
            address="1234 Lester Street",
            relationship_to_child="FOSTER_CAREGIVER",
            intake_id=1,
        )
        with pytest.raises(Exception):
            caregiver_service.create_caregiver(param)

    def test_empty_param(self):
        with pytest.raises(Exception):
            caregiver_service.create_caregiver(None)


class TestDeletion:
    def test_delete_success(self, caregiver_service):
        caregiver_service.delete_caregiver(1)
        assert Caregiver.query.get(1) is None

    def test_delete_nonexistent_id_fail(self, caregiver_service):
        with pytest.raises(Exception):
            caregiver_service.delete_caregiver(999)
