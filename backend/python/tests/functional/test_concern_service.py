import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.concern import Concern
from app.models.intake import Intake
from app.models.user import User
from app.resources.concern_dto import ConcernDTO
from app.services.implementations.concern_service import ConcernService


@pytest.fixture
def concern_service():
    concern_service = ConcernService(current_app.logger)
    seed_database()
    yield concern_service
    teardown_database()


DEFAULT_CONCERNS = (
    {"concern": "FAMILY_CONFLICT", "type": "FAMILIAL_CONCERN", "is_default": True},
    {"concern": "CHILD_NEGLECT", "type": "FAMILIAL_CONCERN", "is_default": True},
    {"concern": "SEXUAL_ABUSE", "type": "FAMILIAL_CONCERN", "is_default": True},
    {"concern": "MENTAL_HEALTH", "type": "FAMILIAL_CONCERN", "is_default": True},
    {"concern": "POVERTY", "type": "FAMILIAL_CONCERN", "is_default": True},
    {"concern": "MENTAL_HEALTH", "type": "CHILD_BEHAVIOUR", "is_default": True},
    {"concern": "RUNAWAY", "type": "CHILD_BEHAVIOUR", "is_default": True},
    {"concern": "CHILD_BEHAVIORS", "type": "CHILD_BEHAVIOUR", "is_default": True},
    {"concern": "SEXUAL_ABUSE", "type": "CHILD_BEHAVIOUR", "is_default": True},
)

DUMMY_USER_DATA = {
    "id": 99,
    "first_name": "John",
    "last_name": "Doe",
    "auth_id": "auth0|123456789",
    "role": "User",
    "branch": "ALGOMA",
}

DUMMY_INTAKE_DATA = {
    "id": 1,
    "user_id": 99,
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

DUMMY_INTAKES_CONCERNS_FAMILIAL = (
    {"intake_id": 1, "concern_id": 1},
    {"intake_id": 1, "concern_id": 2},
    {"intake_id": 1, "concern_id": 3},
)

DUMMY_INTAKES_CONCERNS_CHILD = (
    {"intake_id": 1, "concern_id": 6},
    {"intake_id": 1, "concern_id": 7},
)

DUMMY_INTAKES_CONCERNS = DUMMY_INTAKES_CONCERNS_FAMILIAL + DUMMY_INTAKES_CONCERNS_CHILD


# TODO: remove this step when migrations are configured to run against test db
def seed_database():
    user = User(**DUMMY_USER_DATA)
    concern_instances = [Concern(**data) for data in DEFAULT_CONCERNS]
    intake_instance = Intake(**DUMMY_INTAKE_DATA)

    db.session.add(user)
    for concern in concern_instances:
        db.session.add(concern)
    db.session.commit()
    db.session.add(intake_instance)
    db.session.commit()

    for intake_concern in DUMMY_INTAKES_CONCERNS:
        db.engine.execute(
            "INSERT INTO intakes_concerns (intake_id, concern_id) VALUES (%s, %s)",
            intake_concern["intake_id"],
            intake_concern["concern_id"],
        )

    db.session.commit()


def teardown_database():
    db.engine.execute("DELETE FROM intakes_concerns;")
    Concern.query.delete()
    db.engine.execute("ALTER SEQUENCE concerns_id_seq RESTART WITH 1;")
    Intake.query.delete()
    db.engine.execute("ALTER SEQUENCE intakes_id_seq RESTART WITH 1;")
    User.query.delete()
    db.engine.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
    db.session.commit()


def test_get_familial_concern_success(concern_service):
    res = concern_service.get_familial_concern("FAMILY_CONFLICT")
    assert type(res) is ConcernDTO
    assert res.concern == "FAMILY_CONFLICT"


def test_get_child_concern_success(concern_service):
    res = concern_service.get_child_concern("MENTAL_HEALTH")
    assert type(res) is ConcernDTO
    assert res.concern == "MENTAL_HEALTH"


def test_add_familial_concern_success(concern_service):
    res = concern_service.add_concern("FAMILIAL_CONCERN", "ABUSE", True)
    assert type(res) is ConcernDTO
    assert Concern.query.get(res.id).concern == "ABUSE"


def test_add_child_concern_success(concern_service):
    res = concern_service.add_concern("CHILD_BEHAVIOUR", "TERROR", True)
    assert type(res) is ConcernDTO
    assert Concern.query.get(res.id).concern == "TERROR"


def test_get_all_child_concerns_success(concern_service):
    res = concern_service.get_all_concerns("child_behaviour")
    assert type(res) == list
    child_concerns = [
        item for item in DEFAULT_CONCERNS if item["type"] == "CHILD_BEHAVIOUR"
    ]
    assert len(res) == len(child_concerns)
    assert all(type(item) == ConcernDTO for item in res)
    assert all(item.type == "CHILD_BEHAVIOUR" for item in res)


def test_get_all_familial_concerns_success(concern_service):
    res = concern_service.get_all_concerns("familial_concern")
    assert type(res) == list
    familial_concerns = [
        item for item in DEFAULT_CONCERNS if item["type"] == "FAMILIAL_CONCERN"
    ]
    assert len(res) == len(familial_concerns)
    assert all(type(item) == ConcernDTO for item in res)
    assert all(item.type == "FAMILIAL_CONCERN" for item in res)


def test_get_familial_concern_id_invalid_arg(concern_service):
    with pytest.raises(Exception):
        concern_service.get_familial_concern(3143)


def test_get_child_concern_id_invalid_arg(concern_service):
    with pytest.raises(Exception):
        concern_service.get_child_concern(3143)


def test_get_familial_concern_id_null_arg_raises_exception(concern_service):
    with pytest.raises(Exception):
        concern_service.get_familial_concern(None)


def test_get_child_concern_id_null_arg_raises_exception(concern_service):
    with pytest.raises(Exception):
        concern_service.get_child_concern(None)


def test_get_concerns_nil_param_fails(concern_service):
    with pytest.raises(Exception):
        concern_service.get_all_concerns(None)


def test_get_familial_concern_by_intake_id_success(concern_service):
    res = concern_service.get_concerns_by_intake(intake_id=1, type="FAMILIAL_CONCERN")
    assert type(res) is list
    all_concerns = [
        concern for concern in DEFAULT_CONCERNS if concern["type"] == "FAMILIAL_CONCERN"
    ]
    assert len(res) == len(DUMMY_INTAKES_CONCERNS_FAMILIAL)
    assert all(type(item) == ConcernDTO for item in res)
    assert all(item.type == "FAMILIAL_CONCERN" for item in res)


def test_get_child_concern_by_intake_id_success(concern_service):
    res = concern_service.get_concerns_by_intake(intake_id=1, type="CHILD_BEHAVIOUR")
    assert type(res) is list

    concern_ids = [item["concern_id"] for item in DUMMY_INTAKES_CONCERNS_CHILD]
    assert sorted([item.id for item in res]) == sorted(concern_ids)

    assert len(res) == len(DUMMY_INTAKES_CONCERNS_CHILD)
    assert all(type(item) == ConcernDTO for item in res)
    assert all(item.type == "CHILD_BEHAVIOUR" for item in res)


def test_get_concerns_by_intake_id_success(concern_service):
    res = concern_service.get_concerns_by_intake(intake_id=1)
    assert type(res) == list
    assert len(res) == len(DUMMY_INTAKES_CONCERNS)
    assert all(type(item) == ConcernDTO for item in res)

    res_ids = sorted([item.id for item in res])
    dummy_ids = sorted([item["concern_id"] for item in DUMMY_INTAKES_CONCERNS])
    assert res_ids == dummy_ids


def test_get_all_concerns_success(concern_service):
    res = concern_service.get_all_concerns(type="FAMILIAL_CONCERN")
    assert type(res) == list
    assert len(res) == len(
        [item for item in DEFAULT_CONCERNS if item["type"] == "FAMILIAL_CONCERN"]
    )
    assert all(type(item) == ConcernDTO for item in res)
    assert all(item.type == "FAMILIAL_CONCERN" for item in res)


def test_get_concerns_by_non_existent_intake_id_raises_error():
    with pytest.raises(Exception):
        concern_service.get_concerns_by_intake(intake_id=1)
