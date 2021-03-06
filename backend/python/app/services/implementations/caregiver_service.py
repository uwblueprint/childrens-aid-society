from ...models import db
from ...models.caregiver import Caregiver
from ...resources.caregiver_dto import CaregiverDTO, CreateCaregiverDTO
from ..interfaces.caregiver_service import ICaregiverService


class CaregiverService(ICaregiverService):
    def __init__(self, logger):
        self.logger = logger

    def create_caregiver(self, caregiver):
        try:
            if not isinstance(caregiver, CreateCaregiverDTO):
                raise Exception("Caregiver passed is not of CreateCaregiverDTO type")
            if not caregiver:
                raise Exception(
                    "Empty caregiver DTO/None passed to create_caregiver function"
                )
            # check for valid input fields
            error = caregiver.validate()
            if error:
                raise Exception(error)
            new_caregiver = Caregiver(**caregiver.__dict__)
            db.session.add(new_caregiver)
            db.session.commit()
            return CaregiverDTO(**new_caregiver.to_dict())
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error
