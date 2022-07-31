from ...models import db
from ...models.concern import Concern
from ...resources.concern_dto import ConcernDTO
from ..interfaces.concern_service import IConcernService


class ConcernService(IConcernService):
    def __init__(self, logger):
        self.logger = logger

    def get_familial_concern(self, familial_concern, type="FAMILIAL_CONCERN"):
        try:
            familial_concern_upper = familial_concern.upper()
            familial_concern_entry = Concern.query.filter_by(
                concern=familial_concern_upper, type=type
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

    def get_child_concern(self, child_concern, type="CHILD_BEHAVIOUR"):
        try:
            child_concern_upper = child_concern.upper()
            child_concern_entry = Concern.query.filter_by(
                concern=child_concern_upper, type=type
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
