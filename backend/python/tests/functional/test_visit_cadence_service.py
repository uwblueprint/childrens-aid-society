import pytest
from flask import current_app

from app.models import db
from app.models.visit_cadence import VisitCadence
from app.models.child import Child
from app.models.intake import Intake
from app.models.caregiver import Caregiver
from app.models.daytime_contact import DaytimeContact
from app.models.user import User
from app.resources.visit_cadence_dto import CreateVisitCadenceDTO, VisitCadenceDTO
from app.services.implementations.visit_cadence_service import VisitCadenceService

DUMMY_USER_DATA = {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "auth_id": "auth0|123456789",
    "role": "User",
    "branch": "ALGOMA",
}
DEFAULT_VISIT_CADENCES = {
        "id": 1,
        "date": "Monday",
        "time": "10:00 AM",
        "frequency": "Weekly",
        "family_member": "Dad",
        "notes": "Regular visit",
        "intake_id": 1,
        "child_id": 1,
        "caregiver_id": 1,
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
    "id": 1,
    "name": "John Doe",
    "date_of_birth": "1999-01-01",
    "primary_phone_number": "1234567890",
    "secondary_phone_number": "2345678901",
    "email": "test123@uwaterloo.ca",
    "address": "123 Fake Street",
    "relationship_to_child": "FOSTER_CAREGIVER",
    "intake_id": 1,
}
DUMMY_CHILD_DATA = {
    "intake_id": 1,
    "first_name": "Test",
    "last_name": "Child",
    "date_of_birth": "2020-05-17",
    "cpin_number": "1",
    "service_worker": "Test Worker",
    "daytime_contact_id": 1,
    "special_needs": "None",
}
DUMMY_DAYTIME_CONTACT_DATA = {
    "name": "Hamzaa Yusuff",
    "address": "123 Main St",
    "contact_information": "8790832",
    "dismissal_time": "4:00PM",
}

@pytest.fixture
def visit_cadence_service():
    visit_cadence_service = VisitCadenceService(current_app.logger)
    seed_database()
    yield visit_cadence_service
    empty_database()


def seed_database():
    empty_database()
    user = User(**DUMMY_USER_DATA)
    db.session.add(user)
    daytime_contact = DaytimeContact(**DUMMY_DAYTIME_CONTACT_DATA)
    db.session.add(daytime_contact)
    dummy_intake = Intake(**DUMMY_INTAKE_DATA)
    db.session.add(dummy_intake)
    db.session.commit()
    dummy_child = Child(**DUMMY_CHILD_DATA)
    db.session.add(dummy_child)
    db.session.commit()

    dummy_caregiver = Caregiver(**DUMMY_CAREGIVER_DATA)
    db.session.add(dummy_caregiver)
    db.session.commit()

    visit_cadence_instances = VisitCadence(**DEFAULT_VISIT_CADENCES)
    db.session.add(visit_cadence_instances)
    db.session.commit()


def empty_database():
    VisitCadence.query.delete()
    db.session.execute("ALTER SEQUENCE visit_cadences_id_seq RESTART WITH 1")
    db.session.commit()


def assert_returned_cadences(cadences, expected):
    assert cadences[0] == expected


def test_get_all_cadences(visit_cadence_service):
    res = visit_cadence_service.get_all_cadences()
    cadences = list(map(lambda cadence: cadence.__dict__, res))
    assert_returned_cadences(cadences, DEFAULT_VISIT_CADENCES)
