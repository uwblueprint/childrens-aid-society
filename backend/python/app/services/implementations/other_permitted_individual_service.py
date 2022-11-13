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

    def get_all_other_permitted_individuals(self):
        try:
            return [
                OtherPermittedIndividualDTO(
                    **other_permitted_individual.__dict__)
                for other_permitted_individual in OtherPermittedIndividual.query.all()
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

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
                **new_other_permitted_individual_entry.__dict__
            )
        except Exception as error:
            db.session.rollback()
            raise error
