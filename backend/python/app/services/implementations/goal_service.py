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
                GoalDTO(result.id, result.goal)
                for result in Goal.query.all()
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_short_term_goal(self, method):
            try:
                goal_upper = method.upper()
                type = method.type()

                goal = Goal.query.filter_by(
                    goal=goal_upper
                    type=type;
                ).first()
                if goal:
                    return GoalDTO(
                        goal.id,
                        goal.goal,
                    )
                return None
            except Exception as error:
                self.logger.error(str(error))
                raise error

    def get_goal(self, method):
            try:
                goal_upper = method.upper()

                goal = Goal.query.filter_by(
                    goal=goal_upper
                ).first()
                if goal:
                    return GoalDTO(
                        goal.id,
                        goal.goal,
                    )
                return None
            except Exception as error:
                self.logger.error(str(error))
                raise error


    def add_new_goal(self, goal, type):
        try:
            new_goal = Goal(
                goal=goal.goal.upper()
            )
            db.session.add(new_goal)
            db.session.commit()
            return GoalDTO(
                new_goal.id,
                new_goal.goal,
            )
        except Exception as error:
            db.session.rollback()
            raise error
