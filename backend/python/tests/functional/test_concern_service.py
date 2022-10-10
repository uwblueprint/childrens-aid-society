import pytest
from flask import current_app

from app.models import db
from app.models.concern import Concern
from app.models.intake import Intake, intakes_concerns
from app.resources.concern_dto import ConcernDTO
from app.services.implementations.concern_service import ConcernService


@pytest.fixture
def concern_service():
    concern_service = ConcernService(current_app.logger)
    seed_database()
    yield concern_service
    db.engine.execute("DELETE FROM intakes_concerns;")
    Intake.query.delete()
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
    concern_instances = [Concern(**data) for data in DEFAULT_CONCERNS]
    intake_instance = Intake(id=1)
    intake_instance.concerns.extend(concern_instances)
    db.session.add(intake_instance)
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
    assert len(res) == len(all_concerns)
    assert all(type(item) == ConcernDTO for item in res)
    assert all(item.type == "FAMILIAL_CONCERN" for item in res)


def test_get_child_concern_by_intake_id_success(concern_service):
    res = concern_service.get_concerns_by_intake(intake_id=1, type="CHILD_BEHAVIOUR")
    assert type(res) is list
    all_concerns = [
        concern for concern in DEFAULT_CONCERNS if concern["type"] == "CHILD_BEHAVIOUR"
    ]
    assert len(res) == len(all_concerns)
    assert all(type(item) == ConcernDTO for item in res)
    assert all(item.type == "CHILD_BEHAVIOUR" for item in res)


def test_get_all_concerns_success(concern_service):
    res = concern_service.get_concerns_by_intake(intake_id=1)
    assert type(res) == list
    assert len(res) == len(DEFAULT_CONCERNS)
    assert all(type(item) == ConcernDTO for item in res)
    concern_type_counter = {}
    for concern in DEFAULT_CONCERNS:
        concern_type = concern["type"]
        concern_type_counter[concern_type] = (
            concern_type_counter.get(concern_type, 0) + 1
        )

    concern_type_res_counter = {}
    for item in res:
        item_type = item.type
        concern_type_res_counter[item_type] = (
            concern_type_res_counter.get(item_type, 0) + 1
        )

    assert concern_type_counter == concern_type_res_counter


def test_get_concerns_by_non_existent_intake_id_raises_error():
    with pytest.raises(Exception):
        concern_service.get_concerns_by_intake(intake_id=1)
