import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.caregiver import Caregiver
from app.models.child import Child
from app.models.child_behavior import ChildBehavior
from app.models.daytime_contact import DaytimeContact
from app.models.intake import Intake
from app.models.user import User
from app.resources.child_behavior_dto import ChildBehaviorDTO
from app.services.implementations.child_behavior_service import ChildBehaviorService

DUMMY_USER_DATA = {
    "first_name": "Hamza",
    "last_name": "Yusuff",
    "auth_id": "hbyusuff",
    "role": "User",
    "branch": "ALGOMA",
}

DUMMY_INTAKE_DATA = {
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

DUMMY_DAYTIME_CONTACT_DATA = {
    "name": "Hamzaa Yusuff",
    "address": "123 Main St",
    "contact_information": "8790832",
    "dismissal_time": "4:00PM",
}

DUMMY_CHILD = {
    "id": 1,
    "first_name": "Jane",
    "last_name": "Doe",
    "child_service_worker_id": 1,
    "daytime_contact_id": 1,
    "special_needs": "None",
    "has_kinship_provider": True,
    "has_foster_placement": False,
}

DUMMY_CHILD_BEHAVIOR = {
    "behavior": "BEHAVIOR 1",
    "is_default": True,
}

DUMMY_CHILD_JOIN_CHILD_BEHAVIOR = [
    {"child_id": 1, "child_behavior_id": 1},
]


@pytest.fixture
def child_behavior_service():
    child_behavior_service = ChildBehaviorService(current_app.logger)
    seed_database()
    yield child_behavior_service
    teardown_database()


def seed_database():
    dummy_user = User(**DUMMY_USER_DATA)
    db.session.add(dummy_user)
    db.session.commit()

    dummy_intake = Intake(**DUMMY_INTAKE_DATA)
    db.session.add(dummy_intake)
    db.session.commit()

    dummy_daytime_contact = DaytimeContact(**DUMMY_DAYTIME_CONTACT_DATA)
    db.session.add(dummy_daytime_contact)
    db.session.commit()

    dummy_child = Child(**DUMMY_CHILD)
    db.session.add(dummy_child)
    db.session.commit()

    dummy_child_behavior = ChildBehavior(**DUMMY_CHILD_BEHAVIOR)
    db.session.add(dummy_child_behavior)
    db.session.commit()

    for child_join_child_behavior in DUMMY_CHILD_JOIN_CHILD_BEHAVIOR:
        db.session.execute(
            "INSERT INTO child_join_child_behavior (child_id, child_behavior_id) VALUES (:child_id, :child_behavior_id)",
            child_join_child_behavior,
        )
    db.session.commit()


def teardown_database():
    db.engine.execute("DELETE FROM child_join_child_behavior")
    db.engine.execute("DELETE FROM child_behaviors")
    db.engine.execute("DELETE FROM children")
    db.engine.execute("DELETE FROM daytime_contacts")
    db.engine.execute("DELETE FROM intakes")
    db.engine.execute("DELETE FROM users")

    db.engine.execute("ALTER SEQUENCE child_behaviors_id_seq RESTART WITH 1")
    db.engine.execute("ALTER SEQUENCE children_id_seq RESTART WITH 1")
    db.engine.execute("ALTER SEQUENCE daytime_contacts_id_seq RESTART WITH 1")
    db.engine.execute("ALTER SEQUENCE intakes_id_seq RESTART WITH 1")
    db.engine.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    db.session.commit()


def test_get_child_behavior_success(child_behavior_service):
    res = child_behavior_service.get_child_behavior("BEHAVIOR 1")
    desired = ChildBehaviorDTO(id=1, behavior="BEHAVIOR 1", is_default=True)
    assert type(res) is ChildBehaviorDTO
    assert res.__dict__ == desired.__dict__


def test_get_child_behavior_fail(child_behavior_service):
    res = child_behavior_service.get_child_behavior("I DON'T EXIST")
    assert res is None


def test_add_child_behavior_success(child_behavior_service):
    res = child_behavior_service.add_child_behavior("bEHaVIoR 2")
    desired = ChildBehaviorDTO(id=2, behavior="BEHAVIOR 2", is_default=False)
    assert type(res) is ChildBehaviorDTO
    assert res.__dict__ == desired.__dict__


def test_get_child_behaviors_by_child_success(child_behavior_service):
    res = child_behavior_service.get_child_behaviors_by_child(1)
    desired = [ChildBehaviorDTO(id=1, behavior="BEHAVIOR 1", is_default=True)]
    assert type(res) is list
    assert all([x.__dict__ == y.__dict__ for x, y in zip(res, desired)])


def test_get_all_child_behaviors_success(child_behavior_service):
    res = child_behavior_service.get_all_child_behaviors()
    desired = [ChildBehaviorDTO(id=1, behavior="BEHAVIOR 1", is_default=True)]
    assert type(res) is list
    assert all([x.__dict__ == y.__dict__ for x, y in zip(res, desired)])
