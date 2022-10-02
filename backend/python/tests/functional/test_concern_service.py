import pytest
from flask import current_app

from app.models import db
from app.models.concern import Concern
from app.resources.concern_dto import ConcernDTO
from app.services.implementations.concern_service import ConcernService


@pytest.fixture
def concern_service():
    concern_service = ConcernService(current_app.logger)
    seed_database()
    yield concern_service
    Concern.query.delete()


DEFAULT_CONCERNS = (
    {
        "concern": "FAMILY_CONFLICT",
        "type": "FAMILIAL_CONCERN",
        "is_default": True,
    },
    {
        "concern": "DOMESTIC_VIOLENCE",
        "type": "FAMILIAL_CONCERN",
        "is_default": True,
    },
    {"concern": "ISOLATION", "type": "FAMILIAL_CONCERN", "is_default": True},
    {
        "concern": "WEAPONS_IN_HOME",
        "type": "FAMILIAL_CONCERN",
        "is_default": True,
    },
    {"concern": "CHILD_ABUSE", "type": "FAMILIAL_CONCERN", "is_default": True},
    {"concern": "CHILD_NEGLECT", "type": "FAMILIAL_CONCERN", "is_default": True},
    {"concern": "SEXUAL_ABUSE", "type": "FAMILIAL_CONCERN", "is_default": True},
    {
        "concern": "CHILD_BEHAVIORS",
        "type": "FAMILIAL_CONCERN",
        "is_default": True,
    },
    {
        "concern": "SUBSTANCE_ABUSE",
        "type": "FAMILIAL_CONCERN",
        "is_default": True,
    },
    {"concern": "MENTAL_HEALTH", "type": "FAMILIAL_CONCERN", "is_default": True},
    {
        "concern": "SUICIDE_ATTEMPTS",
        "type": "FAMILIAL_CONCERN",
        "is_default": True,
    },
    {
        "concern": "PARENTING_SKILLS",
        "type": "FAMILIAL_CONCERN",
        "is_default": True,
    },
    {
        "concern": "HOME_MANAGEMENT",
        "type": "FAMILIAL_CONCERN",
        "is_default": True,
    },
    {"concern": "POVERTY", "type": "FAMILIAL_CONCERN", "is_default": True},
    {
        "concern": "DEVELOPMENTAL_DISABILITY",
        "type": "FAMILIAL_CONCERN",
        "is_default": True,
    },
    {
        "concern": "MEDICAL_ILLNESS_OR_DISABILITY",
        "type": "FAMILIAL_CONCERN",
        "is_default": True,
    },
    {"concern": "MENTAL_HEALTH", "type": "CHILD_BEHAVIOUR", "is_default": True},
    {"concern": "RUNAWAY", "type": "CHILD_BEHAVIOUR", "is_default": True},
    {"concern": "CHILD_BEHAVIORS", "type": "CHILD_BEHAVIOUR", "is_default": True},
    {"concern": "SEXUAL_ABUSE", "type": "CHILD_BEHAVIOUR", "is_default": True},
    {
        "concern": "DEVELOPMENTAL_DISABILITY",
        "type": "CHILD_BEHAVIOUR",
        "is_default": True,
    },
    {"concern": "SUBSTANCE_ABUSE", "type": "CHILD_BEHAVIOUR", "is_default": True},
    {
        "concern": "TRUANCY_OR_SCHOOL_PROBLEMS",
        "type": "CHILD_BEHAVIOUR",
        "is_default": True,
    },
    {
        "concern": "SUICIDE_ATTEMPTS",
        "type": "CHILD_BEHAVIOUR",
        "is_default": True,
    },
    {
        "concern": "MEDICAL_ILLNESS_OR_DISABILITY",
        "type": "CHILD_BEHAVIOUR",
        "is_default": True,
    },
)
# TODO: remove this step when migrations are configured to run against test db


def seed_database():
    concern_instance = [Concern(**data) for data in DEFAULT_CONCERNS]
    db.session.bulk_save_objects(concern_instance)


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
