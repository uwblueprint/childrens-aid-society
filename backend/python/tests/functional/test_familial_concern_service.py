import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.familial_concern import FamilialConcern
from app.models.intake import Intake
from app.models.user import User
from app.resources.familial_concern_dto import FamilialConcernDTO
from app.services.implementations.familial_concern_service import FamilialConcernService

DUMMY_FAMILIAL_CONCERN = [
    {
        "concern": "CONCERN 1",
        "is_default": True,
    },
    {
        "concern": "CONCERN 2",
        "is_default": False,
    },
]

DUMMY_USER_DATA = {
    "first_name": "John",
    "last_name": "Doe",
    "auth_id": "auth0|123456789",
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

DUMMY_INTAKES_CONCERNS = [
    {
        "intake_id": 1,
        "concern_id": 1,
    },
]


@pytest.fixture
def familial_concern_service():
    familial_concern_service = FamilialConcernService(current_app.logger)
    seed_database()
    yield familial_concern_service
    teardown_database()


def seed_database():
    test_family_concerns = [
        FamilialConcern(**familial_concern)
        for familial_concern in DUMMY_FAMILIAL_CONCERN
    ]
    for test_family_concern in test_family_concerns:
        db.session.add(test_family_concern)
        db.session.commit()

    test_user = User(**DUMMY_USER_DATA)
    db.session.add(test_user)
    db.session.commit()

    test_intake = Intake(**DUMMY_INTAKE_DATA)
    db.session.add(test_intake)
    db.session.commit()

    for i in DUMMY_INTAKES_CONCERNS:
        db.session.execute(
            "INSERT INTO intakes_concerns (intake_id, concern_id) VALUES (:intake_id, :concern_id)",
            i,
        )
        db.session.commit()


def teardown_database():
    db.engine.execute("DELETE FROM intakes_concerns")
    db.engine.execute("DELETE FROM intakes")
    db.engine.execute("DELETE FROM users")
    db.engine.execute("DELETE FROM familial_concerns")
    db.engine.execute("ALTER SEQUENCE intakes_id_seq RESTART WITH 1")
    db.engine.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    db.engine.execute("ALTER SEQUENCE familial_concerns_id_seq RESTART WITH 1")

    db.session.commit()


def test_get_familial_concern_success(familial_concern_service):
    res = familial_concern_service.get_familial_concern("CONCERN 1")
    desired = FamilialConcernDTO(id=1, concern="CONCERN 1", is_default=True)
    assert type(res) is FamilialConcernDTO
    assert res.__dict__ == desired.__dict__


def test_get_familial_concern_fail(familial_concern_service):
    res = familial_concern_service.get_familial_concern("I DON'T EXIST")
    assert res is None


def test_add_familial_concern_success(familial_concern_service):
    res = familial_concern_service.add_familial_concern("cONcErN 3")
    desired = FamilialConcernDTO(id=3, concern="CONCERN 3", is_default=False)
    assert type(res) is FamilialConcernDTO
    assert res.__dict__ == desired.__dict__


def test_get_familial_concerns_by_intake_success(familial_concern_service):
    res = familial_concern_service.get_familial_concerns_by_intake(1)
    desired = [FamilialConcernDTO(id=1, concern="CONCERN 1", is_default=True)]
    assert type(res) is list
    assert all([x.__dict__ == y.__dict__ for x, y in zip(res, desired)])


def test_get_all_familial_concerns_success(familial_concern_service):
    res = familial_concern_service.get_all_familial_concerns()
    desired = [FamilialConcernDTO(id=1, concern="CONCERN 1", is_default=True)]
    assert type(res) is list
    assert all([x.__dict__ == y.__dict__ for x, y in zip(res, desired)])


def test_delete_familial_concern_success(familial_concern_service):
    res = familial_concern_service.delete_familial_concern('CONCERN 2')
    assert res is None
    assert FamilialConcern.query.get(2) is None


def test_delete_familial_concern_fail(familial_concern_service):
    with pytest.raises(Exception) as e:
        familial_concern_service.delete_familial_concern('999')
        assert e == "Familial concern 999 not found"
