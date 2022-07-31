import pytest
from flask import current_app

from app.models import db
from app.models.goal import Goal
from app.resources.goal_dto import GoalDTO
from app.services.implementations.goal_service import GoalService


@pytest.fixture
def goal_service():
    goal_service = GoalService(current_app.logger)
    seed_database()
    yield goal_service
    Goal.query.delete()


## These are fake goals for testing purposes
DEFAULT_GOALS = {
    long_term_goals,
    [
        {"goal": "Caregiver(s) encourage/allow child(ren) to demonstrate"},
        {"goal": "Caregiver(s) encourage child(ren)"},
    ],
    short_term_goals,
    [
        {"goal": "Caregiver(s) attend consistently"},
        {"goal": "Caregiver(s) attend sober"},
    ],
}

# TODO: remove this step when migrations are configured to run against test db
def seed_database():
    goal_instances = [Goal(**data) for data in DEFAULT_GOALS]
    db.session.bulk_save_objects(goal_instances)


def test_get_goal_fetches_existing_method(goal_service):
    res = goal_service.get_goal("Caregiver(s) encourage/allow")
    assert type(res) is GoalDTO
    assert res.goal == "Caregiver(s) encourage/allow"


def test_get_goal_success(goal_service):
    res = goal_service.get_goals()
    assert type(res) == list
    assert len(res) == len(DEFAULT_GOALS)
    assert all(type(item) == GoalDTO for item in res)
    goal_db = [entry["goal"] for entry in DEFAULT_GOALS]
    goals_res = [item.goal for item in res]
    assert set(goal_db) == set(goals_res)
