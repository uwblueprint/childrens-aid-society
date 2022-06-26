import pytest
from flask import current_app

from app.models import db
from app.models.child_concern import ChildConcern
from app.models.familial_concern import FamilialConcern
from app.resources.concern_dto import ConcernDTO
from app.services.implementations.concern_service import ConcernService


@pytest.fixture
def concern_service():
    concern_service = ConcernService(current_app.logger)
    seed_database()
    yield concern_service
    ChildConcern.query.delete()
    FamilialConcern.query.delete()


DEFAULT_FAMILIAR = (
    {"concern": "FAMILY_CONFLICT"},
    {"concern": "DOMESTIC_VIOLENCE"},
    {"concern": "ISOLATION"},
    {"concern": "WEAPONS_IN_HOME"},
    {"concern": "CHILD_ABUSE"},
    {"concern": "CHILD_NEGLECT"},
    {"concern": "SEXUAL_ABUSE"},
    {"concern": "CHILD_BEHAVIORS"},
    {"concern": "SUBSTANCE_ABUSE"},
    {"concern": "MENTAL_HEALTH"},
    {"concern": "SUICIDE_ATTEMPTS"},
    {"concern": "PARENTING_SKILLS"},
    {"concern": "HOME_MANAGEMENT"},
    {"concern": "POVERTY"},
    {"concern": "DEVELOPMENTAL_DISABILITY"},
    {"concern": "MEDICAL_ILLNESS_OR_DISABILITY"},
)
DEFAULT_CHILD = (
    {"concern": "MENTAL_HEALTH"},
    {"concern": "RUNAWAY"},
    {"concern": "CHILD_BEHAVIORS"},
    {"concern": "SEXUAL_ABUSE"},
    {"concern": "DEVELOPMENTAL_DISABILITY"},
    {"concern": "SUBSTANCE_ABUSE"},
    {"concern": "TRUANCY_OR_SCHOOL_PROBLEMS"},
    {"concern": "SUICIDE_ATTEMPTS"},
    {"concern": "MEDICAL_ILLNESS_OR_DISABILITY"},
)
# TODO: remove this step when migrations are configured to run against test db


def seed_database():
    child_concern_instance = [ChildConcern(**data) for data in DEFAULT_CHILD]
    familial_concern_instance = [FamilialConcern(**data) for data in DEFAULT_FAMILIAR]
    db.session.bulk_save_objects(child_concern_instance)
    db.session.bulk_save_objects(familial_concern_instance)
    # db.session.commit()


def test_get_familial_concern_id_success(concern_service):
    res = concern_service.get_familial_concern_id("FAMILY_CONFLICT")
    assert type(res) is ConcernDTO
    assert res.concern == "FAMILY_CONFLICT"


def test_get_child_concern_id_success(concern_service):
    res = concern_service.get_child_concern_id("MENTAL_HEALTH")
    assert type(res) is ConcernDTO
    assert res.concern == "MENTAL_HEALTH"


def test_add_familial_concern(concern_service):
    res = concern_service.add_familial_concern("TRAUMA")
    assert type(res) is ConcernDTO
    assert FamilialConcern.query.get(res.id).concern == "TRAUMA"


def test_add_child_concern(concern_service):
    res = concern_service.add_child_concern("PTSD")
    assert type(res) is ConcernDTO
    assert ChildConcern.query.get(res.id).concern == "PTSD"


def test_add_familial_concern_success(concern_service):
    res = concern_service.get_familial_concern_id("ABUSE")
    assert type(res) is ConcernDTO
    assert FamilialConcern.query.get(res.id).concern == "ABUSE"

    res2 = concern_service.get_familial_concern_id("VIOLENCE")
    assert type(res2) is ConcernDTO
    assert FamilialConcern.query.get(res2.id).concern == "VIOLENCE"


def test_add_child_concern_success(concern_service):
    res = concern_service.get_child_concern_id("TERROR")
    assert type(res) is ConcernDTO
    assert ChildConcern.query.get(res.id).concern == "TERROR"

    res2 = concern_service.get_child_concern_id("CURSE")
    assert type(res2) is ConcernDTO
    assert ChildConcern.query.get(res2.id).concern == "CURSE"


def test_get_familial_concern_id_invalid_arg(concern_service):
    with pytest.raises(Exception):
        concern_service.get_familial_concern_id(3143)


def test_get_child_concern_id_invalid_arg(concern_service):
    with pytest.raises(Exception):
        concern_service.get_child_concern_id(3143)


def test_get_familial_concern_id_null_arg_raises_exception(concern_service):
    with pytest.raises(Exception):
        concern_service.get_familial_concern_id(None)


def test_get_child_concern_id_null_arg_raises_exception(concern_service):
    with pytest.raises(Exception):
        concern_service.get_child_concern_id(None)
