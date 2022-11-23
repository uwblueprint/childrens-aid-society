from ...models import db
from ...models.child import Child
from ...models.child_behavior import ChildBehavior
from ...resources.child_behavior_dto import ChildBehaviorDTO
from ..interfaces.child_service import IChildBehaviorService


class ChildBehaviorService(IChildBehaviorService):
    def __init__(self, logger):
        self.logger = logger

    def get_child_behavior(self, behavior):
        try:
            child_behavior_entry: ChildBehavior = ChildBehavior.query.filter_by(
                behavior=behavior.upper(),
            ).first()
            return (
                ChildBehaviorDTO(
                    **child_behavior_entry.to_dict()
                )
                if child_behavior_entry
                else None
            )

        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_child_behavior(self, behavior, is_default=False):
        try:
            new_child_behavior_entry = ChildBehavior(
                behavior=behavior.upper(),
                is_default=is_default,
            )
            db.session.add(new_child_behavior_entry)
            db.session.commit()

            return ChildBehaviorDTO(
                **new_child_behavior_entry.to_dict()
            )
        except Exception as error:
            db.session.rollback()
            raise error

    def get_child_behaviors_by_child(self, child_id):
        try:
            child = Child.query.filter_by(id=child_id).first()
            return [
                ChildBehaviorDTO(
                    **result.to_dict()
                )
                for result in child.behaviors
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_all_child_behaviors(self, is_default=True):
        try:
            return [
                ChildBehaviorDTO(
                    **result.to_dict()
                )
                for result in ChildBehavior.query.filter_by(is_default=is_default)
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error
