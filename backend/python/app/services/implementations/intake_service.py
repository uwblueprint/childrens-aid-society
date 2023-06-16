from sqlalchemy import inspect

from ...models import db
from ...models.intake import Intake
from ...models.provider import Provider
from ...resources.intake_dto import CreateIntakeDTO, IntakeDTO
from ..interfaces.intake_service import IIntakeService


class IntakeService(IIntakeService):
    def __init__(self, logger):
        self.logger = logger

    def get_all_intakes(self):
        # FIXME: change this to match spec for actual get intakes method
        try:
            intakes = Intake.query.all()
            intakes_dto = [IntakeDTO(**intake.to_dict()) for intake in intakes]
            return intakes_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def create_intake(self, intake: CreateIntakeDTO):
        try:
            if not intake:
                raise Exception(
                    "Empty intake DTO/None passed to create_intake function"
                )
            if not isinstance(intake, CreateIntakeDTO):
                raise Exception("Intake passed is not of CreateIntakeDTO type")
            error_list = intake.validate()
            if error_list:
                raise Exception(error_list)

            new_intake_entry = Intake(**intake.__dict__)
            db.session.add(new_intake_entry)
            db.session.commit()

            return IntakeDTO(**new_intake_entry.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error

    def delete_intake(self, intake_id: int):
        try:
            if not intake_id:
                raise Exception("Empty intake id passed to delete_intake function")
            if not isinstance(intake_id, int):
                raise Exception("Intake id passed is not of int type")

            intake = Intake.query.filter_by(id=intake_id).first()
            if not intake:
                raise Exception("Intake with id {} not found".format(intake_id))

            providers_to_delete = Provider.query.filter_by(child_id=intake_id).all()

            for provider in providers_to_delete:
                provider.child_id = None
                db.session.delete(provider)

            db.session.delete(intake)
            db.session.commit()

        except Exception as error:
            db.session.rollback()
            raise error
