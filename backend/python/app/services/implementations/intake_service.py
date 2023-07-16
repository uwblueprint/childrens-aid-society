from ...models import db
from ...models.intake import Intake
from ...resources.intake_dto import CreateIntakeDTO, IntakeDTO
from ..interfaces.intake_service import IIntakeService
import logging

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

            db.session.delete(intake)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            raise error

    def update_intake(self, intake_id: int, updated_data):
        try:
            if not intake_id:
                raise Exception("Empty intake id passed to update_intake function")
            if not isinstance(intake_id, int):
                raise Exception("Intake id passed is not of int type")

            intake = Intake.query.filter_by(id=intake_id).first()
            if not intake:
                raise Exception("Intake with id {} not found".format(intake_id))

            if "intake_status" in updated_data:
                intake.intake_status = updated_data["intake_status"]
            if "lead_access_worker_name" in updated_data:
                intake.lead_access_worker_name = updated_data["lead_access_worker_name"]
            if "intake_meeting_notes" in updated_data:
                intake.intake_meeting_notes = updated_data["intake_meeting_notes"]
            db.session.commit()
            return IntakeDTO(**intake.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error
        

    def search_intake(self, family_name: str):
        try:
            if not family_name:
                raise Exception("Empty Family Name passed to search_intake function")
            if not isinstance(family_name, str):
                raise Exception("Family name passed is not of str type")

            intake = Intake.query.filter_by(family_name=family_name)
            intake_dto = [IntakeDTO(**i.to_dict()) for i in intake]
            self.logger.debug(intake)

            if not intake:
                raise Exception("Intake with name {} not found".format(family_name))
            
            return intake_dto
        
        except Exception as error:
            db.session.rollback()
            raise error
        
