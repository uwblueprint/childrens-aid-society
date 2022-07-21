from ...models import db
from ...models.goal import Goal
from ...resources.goal_dto import GoalDTO
from ..interfaces.goal_service import IGoalService


class GoalService(IGoalService):
    def __init__(self, logger):
        self.logger = logger

    def get_goal(self, goal):
        try:
            goal_upper = goal.upper()
            goal_entry = Goal.query.filter_by(goal=goal_upper).first()

            if goal_entry:
                return GoalDTO(goal_entry.id, goal_entry.goal)
            else:
                return self.add_new_goal(goal_upper)
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_new_goal(self, goal):
        try:
            new_goal_entry = Goal(goal=goal.upper())
            db.session.add(new_goal_entry)
            db.session.commit()
            return GoalDTO(new_goal_entry.id, new_goal_entry.goal)
        except Exception as error:
            db.session.rollback()
            raise error
