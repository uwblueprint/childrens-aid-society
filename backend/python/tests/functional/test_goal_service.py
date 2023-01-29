import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.goal import Goal
from app.models.intake import Intake
from app.models.user import User
from app.resources.goal_dto import GoalDTO
from app.services.implementations.goal_service import GoalService


@pytest.fixture
def goal_service():
    goal_service = GoalService(current_app.logger)
    seed_database()
    yield goal_service
    teardown_database()


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

# These are fake goals for testing purposes
DEFAULT_GOALS = [
    {
        "goal": "Caregiver(s) encourage/allow child(ren) to demonstrate",
        "type": "LONG_TERM",
    },
    {"goal": "Caregiver(s) encourage child(ren)", "type": "LONG_TERM"},
    {"goal": "Caregiver(s) attend consistently", "type": "SHORT_TERM"},
    {"goal": "Caregiver(s) attend sober", "type": "SHORT_TERM"},
]

DUMMY_INTAKES_GOALS_LONGTERM = [
    {
        "intake_id": 1,
        "goal_id": 1,
        "start_date": "2020-01-01",
        "end_date": "2020-01-01",
    },
    {
        "intake_id": 1,
        "goal_id": 2,
        "start_date": "2020-01-01",
        "end_date": "2020-01-01",
    },
]

DUMMY_INTAKES_GOALS_SHORTTERM = [
    {
        "intake_id": 1,
        "goal_id": 3,
        "start_date": "2020-01-01",
        "end_date": "2020-01-01",
    },
    {
        "intake_id": 1,
        "goal_id": 4,
        "start_date": "2020-01-01",
        "end_date": "2020-01-01",
    },
]

DUMMY_INTAKES_GOALS = DUMMY_INTAKES_GOALS_LONGTERM + DUMMY_INTAKES_GOALS_SHORTTERM


# TODO: remove this step when migrations are configured to run against test db
def seed_database():
    goal_instances = [Goal(**data) for data in DEFAULT_GOALS]
    user_instance = User(**DUMMY_USER_DATA)
    intake_instance = Intake(**DUMMY_INTAKE_DATA)

    for goal in goal_instances:
        db.session.add(goal)
        db.session.commit()

    db.session.add(user_instance)
    db.session.commit()
    db.session.add(intake_instance)
    db.session.commit()

    for intake_goal in DUMMY_INTAKES_GOALS:
        db.session.execute(
            "INSERT INTO intakes_goals (intake_id, goal_id, start_date, end_date) VALUES (:intake_id, :goal_id, :start_date, :end_date)",
            intake_goal,
        )
        db.session.commit()

    db.session.commit()


def teardown_database():
    db.engine.execute("DELETE FROM intakes_goals;")
    db.engine.execute("DELETE FROM goals;")
    db.engine.execute("DELETE FROM intakes;")
    db.engine.execute("DELETE FROM users;")
    db.engine.execute("ALTER SEQUENCE intakes_id_seq RESTART WITH 1;")
    db.engine.execute("ALTER SEQUENCE goals_id_seq RESTART WITH 1;")
    db.engine.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
    db.session.commit()
    db.session.close()


def test_get_long_term_goal_fetches_existing_goal(goal_service):
    res = goal_service.get_long_term_goal(
        "Caregiver(s) encourage/allow child(ren) to demonstrate"
    )
    assert type(res) is GoalDTO
    assert res.goal == "Caregiver(s) encourage/allow child(ren) to demonstrate"


def test_get_long_term_goal_returns_none_for_nonexistent_goal(goal_service):
    res = goal_service.get_long_term_goal("Caregiver(s) attend consistently")
    assert res is None


def test_get_short_term_goal_fetches_existing_goal(goal_service):
    res = goal_service.get_short_term_goal("Caregiver(s) attend consistently")
    assert type(res) is GoalDTO
    assert res.goal == "Caregiver(s) attend consistently"


def test_get_short_term_goal_returns_none_for_nonexistent_goal(goal_service):
    res = goal_service.get_short_term_goal(
        "Caregiver(s) encourage/allow child(ren) to demonstrate"
    )
    assert res is None


def test_get_all_long_term_goals_success(goal_service):
    res = goal_service.get_all_goals("long_term")
    long_term_goals = [item for item in DEFAULT_GOALS if item["type"] == "LONG_TERM"]
    assert type(res) == list
    assert len(res) == len(long_term_goals)
    assert all(type(item) == GoalDTO for item in res)
    goals_db = [entry["goal"] for entry in long_term_goals]
    goals_res = [item.goal for item in res]
    assert set(goals_db) == set(goals_res)


def test_get_all_short_term_goals_success(goal_service):
    res = goal_service.get_all_goals("short_term")
    short_term_goals = [item for item in DEFAULT_GOALS if item["type"] == "SHORT_TERM"]
    assert type(res) == list
    assert len(res) == len(short_term_goals)
    assert all(type(item) == GoalDTO for item in res)
    goals_db = [entry["goal"] for entry in short_term_goals]
    goals_res = [item.goal for item in res]
    assert set(goals_db) == set(goals_res)


def test_get_long_term_goal_by_intake_id_success(goal_service):
    res = goal_service.get_goals_by_intake(intake_id=1, type="LONG_TERM")
    assert type(res) == list
    goals_long_term_db = [goal for goal in DEFAULT_GOALS if goal["type"] == "LONG_TERM"]
    assert len(res) == len(goals_long_term_db)
    assert all(type(item) == GoalDTO for item in res)
    assert all(item.type == "LONG_TERM" for item in res)


def test_get_short_term_goal_by_intake_id_success(goal_service):
    res = goal_service.get_goals_by_intake(intake_id=1, type="SHORT_TERM")
    assert type(res) == list
    goals_short_term_db = [
        goal for goal in DEFAULT_GOALS if goal["type"] == "SHORT_TERM"
    ]
    assert len(res) == len(goals_short_term_db)
    assert all(type(item) == GoalDTO for item in res)
    assert all(item.type == "SHORT_TERM" for item in res)


def test_get_all_goals_success(goal_service):
    res = goal_service.get_goals_by_intake(intake_id=1)
    assert type(res) == list
    assert len(res) == len(DEFAULT_GOALS)
    assert all(type(item) == GoalDTO for item in res)
    goals_type_db_counter = {}
    for goal in DEFAULT_GOALS:
        goal_type = goal["type"]
        goals_type_db_counter[goal_type] = goals_type_db_counter.get(goal_type, 0) + 1

    goals_type_res_counter = {}
    for item in res:
        item_type = item.type
        goals_type_res_counter[item_type] = goals_type_res_counter.get(item_type, 0) + 1

    assert goals_type_db_counter == goals_type_res_counter
