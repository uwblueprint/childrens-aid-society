from ...models import db
from ...models.child import Child
from ...resources.child_dto import ChildDTO, CreateChildDTO
from ..interfaces.child_service import IChildService


class ChildService(IChildService):
    def __init__(self, logger):
        self.logger = logger

    def add_new_child(self, child):
        try:
            if not isinstance(child, CreateChildDTO):
                raise Exception("Child passed is not of CreateChildDTO type")
            if not child:
                raise Exception("Empty child DTO/None passed to add_new_child function")
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
