import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.caregiver import Caregiver
from app.models.intake import Intake
from app.resources.caregiver_dto import CaregiverDTO, CreateCaregiverDTO
from app.services.implementations.caregiver_service import CaregiverService


@pytest.fixture
def caregiver_service():
    caregiver = CaregiverService(current_app.logger)
    seed_database()
    yield caregiver
    teardown_database()
    Caregiver.query.delete()


DUMMY_INTAKE_DATA = {
    "id": 999,
}


def seed_database():
    intake = Intake(**DUMMY_INTAKE_DATA)
    db.session.add(intake)
    db.session.commit()


def teardown_database():
    Caregiver.query.delete()
    Intake.query.delete()
    db.session.commit()


class TestCreateCaregiverValid:
    def test_normal_case(self, caregiver_service):
        param = CreateCaregiverDTO(
            name="Hamza Yusuff",
            date_of_birth=datetime.date(1999, 1, 1),
            primary_phone_number="1234567890",
            secondary_phone_number="2345678901",
            email="test123@uwaterloo.ca",
            address="1234 Lester Street",
            relationship_to_child="FOSTER_CAREGIVER",
            intake_id=999,
        )
        caregiver_instance = caregiver_service.create_caregiver(param)
        assert type(caregiver_instance) is CaregiverDTO

    def test_nullable_false_case(self, caregiver_service):
        # include only the required fields
        param = CreateCaregiverDTO(
            name="Hamza Yusuff",
            date_of_birth=datetime.date(1999, 1, 1),
            primary_phone_number="1234567890",
            email="test123@uwaterloo.ca",
            address="1234 Lester Street",
            relationship_to_child="FOSTER_CAREGIVER",
            intake_id=999,
        )
        caregiver_instance = caregiver_service.create_caregiver(param)
        assert type(caregiver_instance) is CaregiverDTO


class TestCreateCaregiverInvalidFails:
    def test_missing_field(self, caregiver_service):
        # missing "name", a required field
        param = CreateCaregiverDTO(
            date_of_birth=datetime.date(1999, 1, 1),
            primary_phone_number="1234567890",
            email="test123@uwaterloo.ca",
            address="1234 Lester Street",
            relationship_to_child="FOSTER_CAREGIVER",
            intake_id=999,
        )
        with pytest.raises(Exception):
            caregiver_service.create_caregiver(param)

    def test_empty_input_string(self):
        # empty string for "name", which fails the regex check
        param = CreateCaregiverDTO(
            name="",
            date_of_birth=datetime.date(1999, 1, 1),
            primary_phone_number="1234567890",
            secondary_phone_number="2345678901",
            email="test123@uwaterloo.ca",
            address="1234 Lester Street",
            relationship_to_child="FOSTER_CAREGIVER",
            intake_id=999,
        )
        with pytest.raises(Exception):
            caregiver_service.create_caregiver(param)

    def test_empty_param(self):
        with pytest.raises(Exception):
            caregiver_service.create_caregiver(None)
