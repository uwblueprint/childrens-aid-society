from ...models import db
from ...models.familial_concern import FamilialConcern
from ...models.intake import Intake
from ...resources.familial_concern_dto import FamilialConcernDTO
from ..interfaces.familial_concern_service import IFamilialConcernService


class FamilialConcernService(IFamilialConcernService):
    def __init__(self, logger):
        self.logger = logger

    def get_familial_concern(self, concern: str):
        try:
            familial_concern_entry = FamilialConcern.query.filter_by(
                concern=concern.upper(),
            ).first()
            return (
                FamilialConcernDTO(**familial_concern_entry.to_dict())
                if familial_concern_entry
                else None
            )

        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_familial_concerns_by_intake(self, intake_id: int):
        try:
            intake_instance = Intake.query.filter_by(id=intake_id).first()
            return [
                FamilialConcernDTO(**result.to_dict())
                for result in intake_instance.concerns
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_all_familial_concerns(self, is_default=True):
        try:
            return [
                FamilialConcernDTO(**result.to_dict())
                for result in FamilialConcern.query.filter_by(is_default=is_default)
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_familial_concerns_str_by_intake(self, intake_id: int):
        try:
            intake_instance = Intake.query.filter_by(id=intake_id).first()
            familial_concerns = [
                FamilialConcernDTO(**result.to_dict())
                for result in intake_instance.concerns
            ]
            concern_strings = [concern_obj.concern for concern_obj in familial_concerns]
            return concern_strings
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_familial_concern(self, concern: str, is_default=False):
        try:
            new_familial_concern_entry = FamilialConcern(
                concern=concern.upper(),
                is_default=is_default,
            )
            db.session.add(new_familial_concern_entry)
            db.session.commit()
            return FamilialConcernDTO(**new_familial_concern_entry.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error

    def delete_familial_concern(self, concern: str):
        try:
            familial_concern_entry = FamilialConcern.query.filter_by(
                concern=concern.upper(),
            ).first()
            if not familial_concern_entry:
                raise Exception("Familial concern {} not found".format(concern))
            db.session.delete(familial_concern_entry)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            raise error
