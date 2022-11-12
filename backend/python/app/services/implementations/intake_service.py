from ...models import db
from ...models.familial_concern import FamilialConcern
from ...models.intake import Intake
from ...resources.familial_concern_dto import FamilialConcernDTO
from ..interfaces.intake_service import IFamilialConcernService, IIntakeService


class IntakeService(IIntakeService):
    def __init__(self, logger):
        self.logger = logger
        pass

    def create_intake(self, intake):
        pass


class FamilialConcernService(IFamilialConcernService):
    def __init__(self, logger):
        self.logger = logger

    def get_familial_concern(self, concern):
        try:
            familial_concern_entry = FamilialConcern.query.filter_by(
                concern=concern.upper(),
            ).first()
            return (
                FamilialConcernDTO(
                    id=familial_concern_entry.id,
                    concern=familial_concern_entry.concern,
                    is_default=familial_concern_entry.is_default,
                )
                if familial_concern_entry
                else None
            )

        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_familial_concern(self, concern, is_default=False):
        try:
            new_familial_concern_entry = FamilialConcern(
                concern=concern.upper(),
                is_default=is_default,
            )
            db.session.add(new_familial_concern_entry)
            db.session.commit()
            return FamilialConcernDTO(
                id=new_familial_concern_entry.id,
                concern=new_familial_concern_entry.concern,
                is_default=new_familial_concern_entry.is_default,
            )
        except Exception as error:
            db.session.rollback()
            raise error

    def get_familial_concerns_by_intake(self, intake_id):
        try:
            intake_instance = Intake.query.filter_by(id=intake_id).first()
            return [
                FamilialConcernDTO(
                    id=result.id, concern=result.concern, is_default=result.is_default
                )
                for result in intake_instance.concerns
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_all_familial_concerns(self, is_default=True):
        try:
            return [
                FamilialConcernDTO(
                    id=result.id, concern=result.concern, is_default=result.is_default
                )
                for result in FamilialConcern.query.filter_by(is_default=is_default)
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error
