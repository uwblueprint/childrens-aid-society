from ...models import db
from ...models.daytime_contact import DaytimeContact
from ...resources.daytime_contact_dto import CreateDaytimeContactDTO, DaytimeContactDTO
from ..interfaces.daytime_contact_service import IDaytimeContactService


class DaytimeContactService(IDaytimeContactService):
    def __init__(self, logger):
        self.logger = logger

    def get_all_daytime_contacts(self):
        try:
            daytime_contacts = DaytimeContact.query.all()
            return [
                DaytimeContactDTO(**contact.__dict__) for contact in daytime_contacts
            ]
        except Exception as error:
            raise error

    def create_new_daytime_contact(self, contact: CreateDaytimeContactDTO):
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

    def delete_daytime_contact(self, daytime_contact_id):
        try:
            if not daytime_contact_id:
                raise Exception(
                    "Empty daytime_contact_id/None passed to delete_daytime_contact function"
                )
            if not isinstance(daytime_contact_id, int):
                raise Exception("daytime_contact_id passed is not of int type")

            contact_to_delete = DaytimeContact.query.get(daytime_contact_id)
            if not contact_to_delete:
                raise Exception(
                    "daytime_contact with id {} does not exist".format(
                        daytime_contact_id
                    )
                )

            db.session.delete(contact_to_delete)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            raise error

    def get_daytime_contact_by_id(self, daytime_contact_id):
        try:
            daytime_contact = DaytimeContact.query.filter_by(
                id=daytime_contact_id
            ).first()
            if daytime_contact:
                result = {
                    "name": daytime_contact.name,
                    "contactInfo": daytime_contact.contact_information,
                    "address": daytime_contact.address,
                    "dismissalTime": daytime_contact.dismissal_time,
                }
                return result
            else:
                return (
                    {
                        "name": "",
                        "contactInfo": "",
                        "address": "",
                        "dismissalTime": "",
                    },
                )
        except Exception as error:
            self.logger.error(str(error))
            raise error
