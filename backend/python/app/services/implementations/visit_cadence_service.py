from ...models import db
from ...models.visit_cadence import VisitCadence
from ...resources.visit_cadence_dto import VisitCadenceDTO, CreateVisitCadenceDTO
from ..interfaces.caregiver_service import ICaregiverService


class VisitCadenceService(IVisitCadenceService):
    def __init__(self, logger):
        self.logger = logger

    def create_cadence(self, cadence):
        try:
            if not isinstance(cadence, CreateVisitCadenceDTO):
                raise Exception("Cadence passed is not of CreateVisitCadenceDTO type")
            if not cadence:
                raise Exception(
                    "Empty cadence DTO/None passed to create_cadence function"
                )
            # check for valid input fields
            error = cadence.validate()
            if error:
                raise Exception(error)
            new_cadence = VisitCadence(**cadence.__dict__)
            db.session.add(new_cadence)
            db.session.commit()
            return VisitCadenceDTO(**new_cadence.to_dict())
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error

    def get_all_cadences(self):
        try:
            cadences = VisitCadence.query.all()
            cadences_dto = [
                VisitCadenceDTO(**cadences.to_dict()) for cadence in cadences
            ]
            return cadences_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error
            
    def get_cadences_by_intake_id(self, intakeID):
         try:
            cadences = VisitCadence.query.filter_by(intake_id=intakeID)
            cadences_dto = [
                VisitCadenceDTO(**cadences.to_dict()) for cadence in cadences
            ]
            return cadences_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def delete_cadence(self, cadence_id):
        try:
            cadence = VisitCadence.query.filter_by(id=cadence_id).first()
            if not cadence:
                raise Exception("cadence with id {} not found".format(cadence_id))
            db.session.delete(cadence)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error
