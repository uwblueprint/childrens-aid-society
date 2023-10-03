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

    def get_all_caregivers(self):
        # FIXME: change this to match spec for actual get caregivers method
        try:
            caregivers = Caregiver.query.all()
            caregivers_dto = [
                CaregiverDTO(**caregiver.to_dict()) for caregiver in caregivers
            ]
            return caregivers_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def delete_caregiver(self, caregiver_id):
        try:
            caregiver = Caregiver.query.filter_by(id=caregiver_id).first()
            if not caregiver:
                raise Exception("Caregiver with id {} not found".format(caregiver_id))
            db.session.delete(caregiver)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error

    def get_caregivers_by_intake_id(self, intake_id):
        try:
            caregivers = Caregiver.query.filter_by(intake_id=intake_id).all()
            caregiver_dtos = []
            
            for caregiver in caregivers:
                caregiver_dto = CaregiverDTO(
                    id=caregiver.id,
                    name=caregiver.name,
                    date_of_birth=caregiver.date_of_birth,
                    individual_considerations=caregiver.individual_considerations,
                    primary_phone_number=caregiver.primary_phone_number,
                    secondary_phone_number=caregiver.secondary_phone_number,
                    email=caregiver.email,
                    address=caregiver.address,
                    relationship_to_child=caregiver.relationship_to_child,
                    additional_contact_notes=caregiver.additional_contact_notes,
                    intake_id=caregiver.intake_id,
                )
                caregiver_dtos.append(caregiver_dto)

            return caregiver_dtos

        except Exception as error:
            self.logger.error(str(error))
            raise error