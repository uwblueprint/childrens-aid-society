from ...models import db
from ...models.child import Child
from ...resources.child_dto import ChildDTO, CreateChildDTO
from ..interfaces.child_service import IChildService


class ChildService(IChildService):
    def __init__(self, logger):
        self.logger = logger

    def get_all_children(self):
        try:
            children = Child.query.all()
            return list(
                map(
                    lambda child: ChildDTO(
                        **child.__dict__,
                    ),
                    children,
                )
            )
        except Exception as error:
            raise error

    def add_new_child(self, child: CreateChildDTO):
        try:
            if not child:
                raise Exception("Empty child DTO/None passed to add_new_child function")
            if not isinstance(child, CreateChildDTO):
                raise Exception("Child passed is not of CreateChildDTO type")
            error_list = child.validate()
            if error_list:
                raise Exception(error_list)
            new_child_entry = Child(**child.__dict__)
            db.session.add(new_child_entry)
            db.session.commit()

            return ChildDTO(**new_child_entry.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error

    def delete_child(self, child_id):
        try:
            child = Child.query.filter_by(id=child_id).first()
            if not child:
                raise Exception("Child with id {} not found".format(child_id))
            db.session.delete(child)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            raise error

    def edit_child(self, child_data, child_id):
        try:
            child = Child.query.filter_by(id=child_id).first()
            if not child:
                raise Exception("Child with id {} not found".format(child_id))
            child.intake_id = child_data["intake_id"]
            child.first_name = child_data["first_name"]
            child.last_name = child_data["last_name"]
            child.date_of_birth = child_data["date_of_birth"]
            child.cpin_number = child_data["cpin_number"]
            child.service_worker = child_data["service_worker"]
            child.daytime_contact_id = child_data["daytime_contact_id"]
            child.special_needs = child_data["special_needs"]
            db.session.merge(child)
            db.session.commit()
            return ChildDTO(**child.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error
