from ...models import db
from ...models.child import Child
from ...models.child_behavior import ChildBehavior
from ...resources.child_behavior_dto import ChildBehaviorDTO
from ..interfaces.child_behavior_service import IChildBehaviorService


class ChildBehaviorService(IChildBehaviorService):
    def __init__(self, logger):
        self.logger = logger

    def get_child_behavior(self, behavior: str):
        try:
            child_behavior_entry = ChildBehavior.query.filter_by(
                behavior=behavior.upper(),
            ).first()
            return (
                ChildBehaviorDTO(**child_behavior_entry.to_dict())
                if child_behavior_entry
                else None
            )
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_child_behaviors_by_child(self, child_id: int):
        try:
            child = Child.query.filter_by(id=child_id).first()
            return [ChildBehaviorDTO(**result.to_dict()) for result in child.behaviors]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_concerns_str_by_child(self, child_id: int):
        try:
            child = Child.query.filter_by(id=child_id).first()
            concerns = [
                ChildBehaviorDTO(**result.to_dict()) for result in child.behaviors
            ]
            concern_strings = [concern_obj.behavior for concern_obj in concerns]
            return concern_strings
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_all_child_behaviors(self, is_default=True):
        try:
            return [
                ChildBehaviorDTO(**result.to_dict())
                for result in ChildBehavior.query.filter_by(is_default=is_default)
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_child_behavior(self, behavior: str, is_default=False):
        try:
            new_child_behavior_entry = ChildBehavior(
                behavior=behavior.upper(),
                is_default=is_default,
            )
            db.session.add(new_child_behavior_entry)
            db.session.commit()

            return ChildBehaviorDTO(**new_child_behavior_entry.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error

    def delete_child_behavior(self, behavior: str):
        try:
            child_behavior_entry = ChildBehavior.query.filter_by(
                behavior=behavior.upper(),
            ).first()
            if not child_behavior_entry:
                raise Exception("Child behavior {} not found".format(behavior))
            db.session.delete(child_behavior_entry)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            raise error
