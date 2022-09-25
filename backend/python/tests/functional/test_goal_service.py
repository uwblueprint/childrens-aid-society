from backend.python.app.resources.goal_dto import GoalDTO
from backend.python.app.services.implementations.goal_service import GoalService
import pytest
from flask import current_app

from app.models import db
from app.models.goal import Goal
from app.models.intake import Intake

@pytest.fixture
def goal_service():
    goal_service = GoalService(current_app.logger)
    seed_database()
    yield goal_service
    Goal.query.delete()


def seed_database():
    goal_instances = [Goal(**data) for data in DEFAULT_GOALS]
    intake_instance = Intake(id=1)
    intake_instance.goals.append(goal_instances)
    db.session.bulk_save_objects(intake_instance)
    db.session.commit()

def test_get_long_term_goal_by_intake_id_success():
    res = goal_service.get_goals_by_intake(id=1, type= "LONG_TERM")
    assert type(res) == list
    goals_long_term_db = [goal for goal in DEFAULT_GOALS if goal["type"] == "LONG_TERM"]
    assert len(res) == len(goals_long_term_db)
    assert all(type(item) == GoalDTO for item in res)
    assert all(item.type == "LONG_TERM" for item in res)


def test_get_short_term_goal_by_intake_id_success():
    res = goal_service.get_goals_by_intake(id=1, type= "SHORT_TERM")
    assert type(res) == list
    goals_short_term_db = [goal for goal in DEFAULT_GOALS if goal["type"] == "SHORT_TERM"]
    assert len(res) == len(goals_short_term_db)
    assert all(type(item) == GoalDTO for item in res)
    assert all(item.type == "SHORT_TERM" for item in res)

def test_get_goals_by_non_existent_intake_id_raises_error():
	pass

def test_get_all_goals_success():
    res = goal_service.get_goals_by_intake(id=1)
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
	# pass

DEFAULT_GOALS = [
    {
        "type": "LONG_TERM",
        "goal": "Caregiver(s) encourage/allow child(ren) to demonstrate appropriate emotional/coping skills",
    },
    {
        "type": "LONG_TERM",
        "goal": "Caregiver(s) encourage child(ren) to meet age appropriate physical and cognitive skills",
    },
    {
        "type": "LONG_TERM",
        "goal": "Caregiver(s) engage appropriately with their support system (i.e. approved visitors)",
    },
    {
        "type": "LONG_TERM",
        "goal": "Caregiver(s) appropriately encourages child(ren) to demonstrate age appropriate social skills",
    },

    # SHORT TERM GOALS
    {"type": "SHORT_TERM", "goal": "Caregiver(s) attend consistently"},
    {"type": "SHORT_TERM", "goal": "Caregiver(s) attend sober"},
    {
        "type": "SHORT_TERM",
        "goal": "Caregiver(s) have positive, meaningful, and engaging access visits",
    },
    {
        "type": "SHORT_TERM",
        "goal": "Caregiver(s) demonstrates/meets the child(ren) medical/mental health needs",
    },
]