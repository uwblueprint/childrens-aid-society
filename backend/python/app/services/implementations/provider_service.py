from ...models import db
from ...models.provider import Provider
from ...resources.provider_dto import CreateProviderDTO, ProviderDTO
from ..interfaces.provider_service import IProviderService


class ProviderService(IProviderService):
    def __init__(self, logger):
        self.logger = logger

    def create_new_provider(self, provider):
        try:
            if not provider:
                raise Exception(
                    "Empty provider DTO/None passed to create_new_provider function"
                )
            if not isinstance(provider, CreateProviderDTO):
                raise Exception("Provider passed is not of CreateProviderDTO type")
            error_list = provider.validate()
            if error_list:
                raise Exception(error_list)

            new_provider_entry = Provider(**provider.__dict__)
            db.session.add(new_provider_entry)
            db.session.commit()

            return ProviderDTO(
                id=new_provider_entry.id,
                name=new_provider_entry.name,
                file_number=new_provider_entry.file_number,
                primary_phone_number=new_provider_entry.primary_phone_number,
                secondary_phone_number=new_provider_entry.secondary_phone_number,
                email=new_provider_entry.email,
                address=new_provider_entry.address,
                relationship_to_child=new_provider_entry.relationship_to_child,
                additional_contact_notes=new_provider_entry.additional_contact_notes,
                child_id=new_provider_entry.child_id,
            )
        except Exception as error:
            db.session.rollback()
            raise error
