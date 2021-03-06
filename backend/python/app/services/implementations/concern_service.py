from ...models import db
from ...models.child_concern import ChildConcern
from ...models.familial_concern import FamilialConcern
from ...resources.concern_dto import ConcernDTO
from ..interfaces.concern_service import IConcernService


class ConcernService(IConcernService):
    def __init__(self, logger):
        self.logger = logger

    def get_familial_concern(self, familial_concern):
        try:
            familial_concern_upper = familial_concern.upper()
            familial_concern_entry = FamilialConcern.query.filter_by(
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
            child_concern_entry = ChildConcern.query.filter_by(
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
            new_familial_concern_entry = FamilialConcern(
                concern=familial_concern.upper()
            )
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
            new_child_concern_entry = ChildConcern(concern=child_concern.upper())
            db.session.add(new_child_concern_entry)
            db.session.commit()
            return ConcernDTO(
                new_child_concern_entry.id, new_child_concern_entry.concern
            )
        except Exception as error:
            db.session.rollback()
            raise error
