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
                OtherPermittedIndividualDTO(**other_permitted_individual.__dict__)
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

            other_permitted_individual.id = new_other_permitted_individual_entry.id
            return OtherPermittedIndividualDTO(**other_permitted_individual.__dict__)
        except Exception as error:
            db.session.rollback()
            raise error

    def delete_other_permitted_individual(self, other_permitted_individual_id):
        try:
            other_permitted_individual = OtherPermittedIndividual.query.get(
                other_permitted_individual_id
            )
            if not other_permitted_individual:
                raise Exception(
                    "No other_permitted_individual found with id {}".format(
                        other_permitted_individual_id
                    )
                )
            db.session.delete(other_permitted_individual)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            raise error
        
    def get_other_permitted_individual_by_intake_id(self, intake_id: int) -> List[OtherPermittedIndividualDTO]:
            try:
                # Query the database for OtherPermittedIndividual records with the given intake_id
                other_permitted_individuals = OtherPermittedIndividual.query.filter_by(intake_id=intake_id).all()

                # Convert the database records to a list of DTO objects
                return [
                    OtherPermittedIndividualDTO(**other_permitted_individual.__dict__)
                    for other_permitted_individual in other_permitted_individuals
                ]

            except Exception as error:
                self.logger.error(str(error))
                raise error
