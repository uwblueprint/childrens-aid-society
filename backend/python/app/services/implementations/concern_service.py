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
                concern=familial_concern_upper,
                type="FAMILIAL_CONCERN",
            ).first()
            return (
                ConcernDTO(
                    familial_concern_entry.id,
                    familial_concern_entry.type,
                    familial_concern_entry.concern,
                )
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
                concern=child_concern_upper,
                type="CHILD_BEHAVIOUR",
            ).first()
            return (
                ConcernDTO(
                    child_concern_entry.id,
                    child_concern_entry.type,
                    child_concern_entry.concern,
                )
                if child_concern_entry
                else None
            )
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_concern(self, type, concern):
        try:
            new_concern_entry = Concern(type=type.upper(), concern=concern.upper())
            db.session.add(new_concern_entry)
            db.session.commit()
            return ConcernDTO(
                new_concern_entry.id,
                new_concern_entry.type,
                new_concern_entry.concern,
            )
        except Exception as error:
            db.session.rollback()
            raise error

    def get_concerns_by_intake(self, intake_id, type=None):
        try:
            intake_instance = Intake.query.filter_by(id=intake_id)
            if type:
                # concern_instance = Concern.query.filter_by(
                #     id=intake_instance.concerns.concern_id, type=type,
                # )
                concern_instance = Concern.query.filter(Concern.intakes.any(id=intake_id, type=type)).all()
            else:
                # concern_instance = Concern.query.filter_by(
                #     id=intake_instance.concerns,
                # )
                concern_instance = Concern.query.filter(Concern.intakes.any(id=intake_id)).all()
            concerns = []
            for concern in concern_instance:
                concern.append(
                    ConcernDTO(concern_instance.id, concern_instance.concern)
                )
            return concerns

        except Exception as error:
            self.logger.error(str(error))
            raise error
