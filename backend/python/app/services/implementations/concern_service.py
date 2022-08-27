from ...models import db
from ...models.concern import Concern
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
                    familial_concern_entry.is_default,
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
                    child_concern_entry.is_default,
                )
                if child_concern_entry
                else None
            )
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_concern(self, type, concern, is_default=False):
        try:
            new_concern_entry = Concern(
                type=type.upper(),
                concern=concern.upper(),
                is_default=is_default,
            )
            db.session.add(new_concern_entry)
            db.session.commit()
            return ConcernDTO(
                new_concern_entry.id,
                new_concern_entry.type,
                new_concern_entry.concern,
                new_concern_entry.is_default,
            )
        except Exception as error:
            db.session.rollback()
            raise error

    def get_all_concerns(self, type, is_default=True):
        try:
            type_upper = type.upper()
            return [
                ConcernDTO(result.id, result.type, result.concern, result.is_default)
                for result in Concern.query.filter_by(
                    type=type_upper, is_default=is_default
                )
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error
