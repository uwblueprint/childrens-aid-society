from ...models import db
from ...models.goal import Goal
from ...models.intake import Intake
from ...resources.goal_dto import GoalDTO
from ..interfaces.goal_service import IGoalService


class GoalService(IGoalService):
    def __init__(self, logger):
        self.logger = logger

    def get_all_goals(self, type):
        type_upper = type.upper()
        try:
            return [
                GoalDTO(result.id, result.goal, result.type)
                for result in Goal.query.filter_by(type=type_upper)
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

    def get_goals_by_intake(self, intake_id, type=None):
        try:
            intake = Intake.query.filter_by(id=intake_id).first()
            goals = [
                {
                    'id': result.id,
                    'goal': result.goal,
                    'type': result.type
                }
                for result in intake.goals
                if type == result.type or type is None
            ]
            return goals
        except Exception as error:
            self.logger.error(str(error))
            raise error


    def delete_goal(self, goal_id):
        try:
            goal = Goal.query.filter_by(id=goal_id).first()
            db.session.delete(goal)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            raise error
