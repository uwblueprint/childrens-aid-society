from ...models import db
from ...models.daytime_contact import DaytimeContact
from ...resources.daytime_contact_dto import CreateDaytimeContactDTO, DaytimeContactDTO
from ..interfaces.daytime_contact_service import IDaytimeContactService


class DaytimeContactService(IDaytimeContactService):
    def __init__(self, logger):
        self.logger = logger

    def create_new_daytime_contact(self, contact):
        try:
            if not contact:
                raise Exception(
                    "Empty contact DTO/None passed to create_new_daytime_contact function"
                )
            if not isinstance(contact, CreateDaytimeContactDTO):
                raise Exception("Contact passed is not of CreateDaytimeContactDTO type")
            error_list = contact.validate()
            if error_list:
                raise Exception(error_list)

            new_contact_entry = DaytimeContact(**contact.__dict__)
            db.session.add(new_contact_entry)
            db.session.commit()

            contact.id = new_contact_entry.id
            return DaytimeContactDTO(**contact.__dict__)
        except Exception as error:
            db.session.rollback()
            raise error
