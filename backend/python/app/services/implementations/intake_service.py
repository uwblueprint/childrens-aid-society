from sqlalchemy import inspect

from ...models import db
from ...models.intake import Intake
from ...models.provider import Provider
from ...resources.intake_dto import CreateIntakeDTO, IntakeDTO
from ..interfaces.intake_service import IIntakeService
import logging
class IntakeService(IIntakeService):
    def __init__(self, logger):
        self.logger = logger

    def get_all_intakes(self, intake_status, page_number, page_limit=20):
        start = (page_number - 1) * page_limit
        end = page_number * page_limit
        try:
            intakes = Intake.query.filter_by(intake_status=intake_status).all()
            intakes_dto = [IntakeDTO(**intake.to_dict()) for intake in intakes][
                start:end
            ]
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
            if "referring_worker_name" in updated_data:
                intake.referring_worker_name = updated_data["referring_worker_name"]
            db.session.commit()
            return IntakeDTO(**intake.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error


    def search_intake_family_name(self, family_name: str):
        try:
            if not family_name:
                raise Exception("Empty Family Name passed to search_intake function")
            if not isinstance(family_name, str):
                raise Exception("Family name passed is not of str type")
            intakes = Intake.query.filter_by(family_name=family_name).all()
            print(intakes)
            intakes_dto = [IntakeDTO(**intake.to_dict()) for intake in intakes]
            return intakes_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error
        