from ...models import db
from ...models.goal import Goal
from ...resources.goal_dto import GoalDTO
from ..interfaces.goal_service import IGoalService


class GoalService(IGoalService):
    def __init__(self, logger):
        self.logger = logger

    def get_goals(self):
        try:
            return [
                GoalDTO(result.id, result.goal, result.type)
                for result in Goal.query.all()
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_short_term_goal(self, goal):
        try:
            goal = Goal.query.filter_by(goal=goal, type="SHORT_TERM").first()
            if goal:
                return GoalDTO(goal.id, goal.goal, goal.type)
            return None
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_long_term_goal(self, goal):
        try:
            goal = Goal.query.filter_by(goal=goal, type="LONG_TERM").first()
            if goal:
                return GoalDTO(goal.id, goal.goal, goal.type)
            return None
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_new_goal(self, goal, type):
        try:
            new_goal = Goal(goal=goal, type=type)
            db.session.add(new_goal)
            db.session.commit()
            return GoalDTO(new_goal.id, new_goal.goal, new_goal.type)
        except Exception as error:
            db.session.rollback()
            raise error
