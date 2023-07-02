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

    def get_caregivers_by_intake_id(self, intake_id):
        try:
            caregivers = Caregiver.query.filter_by(intake_id=intake_id)
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

    def update_caregiver(self, caregiver_id: int, updated_caregiver):
        try:
            if not caregiver_id:
                raise Exception(
                    "Empty caregiver id passed to update_caregiver function"
                )
            if not isinstance(caregiver_id, int):
                raise Exception("Caregiver id passed is not of int type")

            caregiver = Caregiver.query.filter_by(id=caregiver_id).first()
            if not caregiver:
                raise Exception("Caregiver with id {} not found".format(caregiver_id))

            if "name" in updated_caregiver:
                caregiver.name = updated_caregiver["name"]
            if "date_of_birth" in updated_caregiver:
                caregiver.date_of_birth = updated_caregiver["date_of_birth"]
            if "individual_considerations" in updated_caregiver:
                caregiver.individual_considerations = updated_caregiver[
                    "individual_considerations"
                ]
            if "primary_phone_number" in updated_caregiver:
                caregiver.primary_phone_number = updated_caregiver[
                    "primary_phone_number"
                ]
            if "secondary_phone_number" in updated_caregiver:
                caregiver.secondary_phone_number = updated_caregiver[
                    "secondary_phone_number"
                ]
            if "email" in updated_caregiver:
                caregiver.email = updated_caregiver["email"]
            if "address" in updated_caregiver:
                caregiver.address = updated_caregiver["address"]
            if "relationship_to_child" in updated_caregiver:
                caregiver.relationship_to_child = updated_caregiver[
                    "relationship_to_child"
                ]
            if "additional_contact_notes" in updated_caregiver:
                caregiver.additional_contact_notes = updated_caregiver[
                    "additional_contact_notes"
                ]
            db.session.commit()
            return CaregiverDTO(**caregiver.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error
