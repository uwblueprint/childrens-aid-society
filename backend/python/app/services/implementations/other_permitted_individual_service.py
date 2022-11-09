from ...models import db
from ...models.other_permitted_individual import OtherPermittedIndividual
from ...resources.other_permitted_individual_dto import (
    CreateOtherPermittedIndividualDTO,
    OtherPermittedIndividualDTO,
)
from ..interfaces.other_permitted_individual_service import (
    IOtherPermittedIndividualService,
)


class OtherPermittedIndividualService(IOtherPermittedIndividualService):
    def __init__(self, logger):
        self.logger = logger

    def create_new_other_permitted_individual(self, other_permitted_individual):
        try:
            if not other_permitted_individual:
                raise Exception(
                    "Empty other_permitted_individual DTO/None passed to create_new_other_permitted_individual function"
                )
            if not isinstance(
                other_permitted_individual, CreateOtherPermittedIndividualDTO
            ):
                raise Exception(
                    "other_permitted_individual passed is not of CreateOtherPermittedIndividualDTO type"
                )
            error_list = other_permitted_individual.validate()
            if error_list:
                raise Exception(error_list)

            new_other_permitted_individual_entry = OtherPermittedIndividual(
                **other_permitted_individual.__dict__
            )
            db.session.add(new_other_permitted_individual_entry)
            db.session.commit()

            return OtherPermittedIndividualDTO(
                id=new_other_permitted_individual_entry.id,
                name=new_other_permitted_individual_entry.name,
                phone_number=new_other_permitted_individual_entry.phone_number,
                relationship_to_child=new_other_permitted_individual_entry.relationship_to_child,
                notes=new_other_permitted_individual_entry.notes,
                intake_id=new_other_permitted_individual_entry.intake_id,
            )
        except Exception as error:
            db.session.rollback()
            raise error
