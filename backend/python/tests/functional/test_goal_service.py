from backend.python.app.services.implementations.goal_service import GoalService
import pytest
from flask import current_app

from app.models import db
from app.models.goal import Goal

@pytest.fixture
def goal_service():
    goal_service = GoalService(current_app.logger)
    seed_database()
    yield goal_service
    Goal.query.delete()


def seed_database():
    goal_instances = [Goal(**data) for data in DEFAULT_GOALS]
    db.session.bulk_save_objects(goal_instances)
    db.session.commit()

def test_get_long_term_goal_by_intake_id_success():
    res = goal_service.get_goals_by_intake()
	# pass

def test_get_short_term_goal_by_intake_id_success():
	pass

def test_get_goals_by_non_existent_intake_id_raises_error():
	pass

def test_get_all_goals_success():
	pass

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