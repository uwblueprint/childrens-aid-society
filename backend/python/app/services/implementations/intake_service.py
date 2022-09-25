from ...models.intake import Intake
from ...models import db
from ..interfaces.intake_service import IIntakeService


class IntakeService(IIntakeService):
    def __init__(self, logger):
        self.logger = logger

    def create_intake(self, intake):
        try:
            new_intake = Intake(**intake.__dict__)
            print(new_intake)
        except Exception as error:
            self.logger.error(str(error))
            raise error

        db.session.add(new_intake)
        db.session.commit()

        return new_intake.to_dict()

    def update_intake(self, id, intake):
        current_intake = Intake.query.get(id)

        if current_intake is None:
            self.logger.error("Invalid id")
            raise Exception("Invalid id")

        intake_dict = intake.__dict__
        intake_dict["id"] = id

        Intake.query.filter_by(id=id).update(intake_dict)
        updated_intake = Intake.query.get(id)
        db.session.commit()

        if updated_intake is None:
            self.logger.error("Invalid id")
            raise Exception("Invalid id")
        return updated_intake.to_dict()
