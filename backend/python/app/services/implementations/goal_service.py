from backend.python.app.models.intake import Intake
from backend.python.app.resources.goal_dto import GoalDTO
from backend.python.app.services.interfaces.goal_service import IGoalService
from backend.python.app.models.goal import Goal

class GoalService(IGoalService):
    def __init__(self, logger) -> None:
        self.logger = logger

    def get_goals_by_intake(self, intake_id, type=None):
        try:
            intake = Intake.query.filter_by(id=intake_id).first()
            return [                
                GoalDTO(result.id, result.type, result.goal) 
                for result in intake.goals if type==result.type or type is None
            ]

            # return [
            #     GoalDTO(result.id, result.type, result.goal)

            #     # for result in Goal.query\
            #     #     .join(intakes_goals)\
            #     #     .join(Intake)\
            #     #     .filter((intakes_goals.c.intake_id == intake_id) & (intake_goals.c.goal_id == Goal.id))\
            #     #     .all()
            # ]
        except Exception as error:
            self.logger.error(str(error))
            raise error