from ...models import db
from ...models.daytime_contact import DaytimeContact
from ...resources.daytime_contact_dto import DaytimeContactDTO, CreateDaytimeContactDTO
from ..interfaces.daytime_contact_service import IDaytimeContactService


class DaytimeContactService(IDaytimeContactService):
    def __init__(self, logger):
        self.logger = logger

    def create_new_daytime_contact(self, contact):
        try:
            if not contact:
                raise Exception("Empty child DTO/None passed to add_new_child function")
            if not isinstance(contact, CreateDaytimeContactDTO):
                raise Exception("Child passed is not of CreateDaytimeContactDTO type")
            error_list = contact.validate()
            if error_list:
                raise Exception(error_list)
            
            new_contact_entry = DaytimeContact(**contact.__dict__)
            db.session.add(new_contact_entry)
            db.session.commit()

            return DaytimeContactDTO(
                id=new_contact_entry.id,
                contact_first_name=new_contact_entry.intake_id,
                contact_last_name=new_contact_entry.first_name,
                address_id=new_contact_entry.last_name,
                phone_number=new_contact_entry.date_of_birth
            )
        except Exception as error:
            db.session.rollback()
            raise error
