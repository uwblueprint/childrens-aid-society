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
        "is_default": False,
    },
    {
        "concern": "DOMESTIC_VIOLENCE",
        "type": "FAMILIAL_CONCERN",
        "is_default": False,
    },
    {"concern": "ISOLATION", "type": "FAMILIAL_CONCERN", "is_default": False},
    {
        "concern": "WEAPONS_IN_HOME",
        "type": "FAMILIAL_CONCERN",
        "is_default": False,
    },
    {"concern": "CHILD_ABUSE", "type": "FAMILIAL_CONCERN", "is_default": False},
    {"concern": "CHILD_NEGLECT", "type": "FAMILIAL_CONCERN", "is_default": False},
    {"concern": "SEXUAL_ABUSE", "type": "FAMILIAL_CONCERN", "is_default": False},
    {
        "concern": "CHILD_BEHAVIORS",
        "type": "FAMILIAL_CONCERN",
        "is_default": False,
    },
    {
        "concern": "SUBSTANCE_ABUSE",
        "type": "FAMILIAL_CONCERN",
        "is_default": False,
    },
    {"concern": "MENTAL_HEALTH", "type": "FAMILIAL_CONCERN", "is_default": False},
    {
        "concern": "SUICIDE_ATTEMPTS",
        "type": "FAMILIAL_CONCERN",
        "is_default": False,
    },
    {
        "concern": "PARENTING_SKILLS",
        "type": "FAMILIAL_CONCERN",
        "is_default": False,
    },
    {
        "concern": "HOME_MANAGEMENT",
        "type": "FAMILIAL_CONCERN",
        "is_default": False,
    },
    {"concern": "POVERTY", "type": "FAMILIAL_CONCERN", "is_default": False},
    {
        "concern": "DEVELOPMENTAL_DISABILITY",
        "type": "FAMILIAL_CONCERN",
        "is_default": False,
    },
    {
        "concern": "MEDICAL_ILLNESS_OR_DISABILITY",
        "type": "FAMILIAL_CONCERN",
        "is_default": False,
    },
    {"concern": "MENTAL_HEALTH", "type": "CHILD_BEHAVIOUR", "is_default": False},
    {"concern": "RUNAWAY", "type": "CHILD_BEHAVIOUR", "is_default": False},
    {"concern": "CHILD_BEHAVIORS", "type": "CHILD_BEHAVIOUR", "is_default": False},
    {"concern": "SEXUAL_ABUSE", "type": "CHILD_BEHAVIOUR", "is_default": False},
    {
        "concern": "DEVELOPMENTAL_DISABILITY",
        "type": "CHILD_BEHAVIOUR",
        "is_default": False,
    },
    {"concern": "SUBSTANCE_ABUSE", "type": "CHILD_BEHAVIOUR", "is_default": False},
    {
        "concern": "TRUANCY_OR_SCHOOL_PROBLEMS",
        "type": "CHILD_BEHAVIOUR",
        "is_default": False,
    },
    {
        "concern": "SUICIDE_ATTEMPTS",
        "type": "CHILD_BEHAVIOUR",
        "is_default": False,
    },
    {
        "concern": "MEDICAL_ILLNESS_OR_DISABILITY",
        "type": "CHILD_BEHAVIOUR",
        "is_default": False,
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
