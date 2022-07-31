from ...models import db
from ...models.concern import Concern
from ...models.intake import Intake
from ...resources.concern_dto import ConcernDTO
from ..interfaces.concern_service import IConcernService


class ConcernService(IConcernService):
    def __init__(self, logger):
        self.logger = logger

    def get_familial_concern(self, familial_concern):
        try:
            familial_concern_upper = familial_concern.upper()
            familial_concern_entry = Concern.query.filter_by(
                concern=familial_concern_upper
            ).first()

            return (
                ConcernDTO(familial_concern_entry.id, familial_concern_entry.concern)
                if familial_concern_entry
                else None
            )

        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_child_concern(self, child_concern):
        try:
            child_concern_upper = child_concern.upper()
            child_concern_entry = Concern.query.filter_by(
                concern=child_concern_upper
            ).first()

            return (
                ConcernDTO(child_concern_entry.id, child_concern_entry.concern)
                if child_concern_entry
                else None
            )
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_familial_concern(self, familial_concern):
        try:
            new_familial_concern_entry = Concern(concern=familial_concern.upper())
            db.session.add(new_familial_concern_entry)
            db.session.commit()
            return ConcernDTO(
                new_familial_concern_entry.id, new_familial_concern_entry.concern
            )
        except Exception as error:
            db.session.rollback()
            raise error

    def add_child_concern(self, child_concern):
        try:
            new_child_concern_entry = Concern(concern=child_concern.upper())
            db.session.add(new_child_concern_entry)
            db.session.commit()
            return ConcernDTO(
                new_child_concern_entry.id, new_child_concern_entry.concern
            )
        except Exception as error:
            db.session.rollback()
            raise error

    def get_concerns_by_intake(self, intake_id, type=None):
        try:
            intake_instance = Intake.query.filter_by(intake_id=intake_id)
            if type:
                concern_instance = Concern.query.filter_by(
                    id=intake_instance.concerns.concern_id, type=type
                )
            else:
                concern_instance = Concern.query.filter_by(
                    intake_id=intake_id,
                )
            concerns = []
            for concern in concern_instance:
                concern.append(
                    ConcernDTO(concern_instance.id, concern_instance.concern)
                )
            return concerns

        except Exception as error:
            self.logger.error(str(error))
            raise error
