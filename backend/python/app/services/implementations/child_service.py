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

    def get_children_by_intake_id(self, intake_id):
        try:
            children = Child.query.filter_by(intake_id=intake_id)
            children_dto = [ChildDTO(**child.to_dict()) for child in children]
            return children_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error