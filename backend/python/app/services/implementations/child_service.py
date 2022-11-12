from ...models import db
from ...models.child import Child
from ...models.child_behavior import ChildBehavior
from ...resources.child_dto import ChildDTO, CreateChildDTO
from ...resources.child_behavior_dto import ChildBehaviorDTO, CreateChildBehaviorDTO
from ..interfaces.child_service import IChildService
from ..interfaces.child_service import IChildBehaviorService


class ChildService(IChildService):
    def __init__(self, logger):
        self.logger = logger

    def add_new_child(self, child):
        try:
            if not child:
                raise Exception(
                    "Empty child DTO/None passed to add_new_child function")
            if not isinstance(child, CreateChildDTO):
                raise Exception("Child passed is not of CreateChildDTO type")
            error_list = child.validate()
            if error_list:
                raise Exception(error_list)
            new_child_entry = Child(**child.__dict__)
            db.session.add(new_child_entry)
            db.session.commit()
            return ChildDTO(
                id=new_child_entry.id,
                intake_id=new_child_entry.intake_id,
                first_name=new_child_entry.first_name,
                last_name=new_child_entry.last_name,
                date_of_birth=new_child_entry.date_of_birth,
                cpin_number=new_child_entry.cpin_number,
                child_service_worker_id=new_child_entry.child_service_worker_id,
                daytime_contact_id=new_child_entry.daytime_contact_id,
                special_needs=new_child_entry.special_needs,
                has_foster_placement=new_child_entry.has_foster_placement,
                has_kinship_provider=new_child_entry.has_kinship_provider,
            )
        except Exception as error:
            db.session.rollback()
            raise error


class ChildBehaviorService(IChildBehaviorService):
    def __init__(self, logger):
        self.logger = logger

    def get_child_behavior(self, behavior):
        try:
            child_behavior_entry = ChildBehavior.query.filter_by(
                behavior=behavior.upper(),
            ).first()
            return (
                ChildBehaviorDTO(
                    id=child_behavior_entry.id,
                    behavior=child_behavior_entry.behavior,
                    is_default=child_behavior_entry.is_default,
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
                id=new_child_behavior_entry.id,
                behavior=new_child_behavior_entry.behavior,
                is_default=new_child_behavior_entry.is_default,
            )
        except Exception as error:
            db.session.rollback()
            raise error

    def get_child_behaviors_by_child(self, child_id):
        try:
            child = Child.query.filter_by(id=child_id).first()
            return [
                ChildBehaviorDTO(
                    id=result.id, behavior=result.behavior, is_default=result.is_default
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
                    id=result.id, behavior=result.behavior, is_default=result.is_default
                )
                for result in ChildBehavior.query.filter_by(is_default=is_default)
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error
