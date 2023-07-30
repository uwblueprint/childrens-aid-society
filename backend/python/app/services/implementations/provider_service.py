from ...models import db
from ...models.provider import Provider
from ...resources.provider_dto import CreateProviderDTO, ProviderDTO
from ..interfaces.provider_service import IProviderService
from typing import List

class ProviderService(IProviderService):
    def __init__(self, logger):
        self.logger = logger

    def get_all_providers(self):
        try:
            providers = Provider.query.all()
            providers_dto = [
                ProviderDTO(**provider.to_dict()) for provider in providers
            ]
            return providers_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error

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

            provider.id = new_provider_entry.id
            return ProviderDTO(**provider.__dict__)
        except Exception as error:
            db.session.rollback()
            raise error

    def delete_provider(self, provider_id):
        try:
            provider = Provider.query.filter_by(id=provider_id).first()
            if not provider:
                raise Exception("Provider with id {} not found".format(provider_id))
            db.session.delete(provider)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            raise error


    def get_providers_by_intake_id(self, intake_id):
        try:
            # Find the child with the desired intake_id
            child = Child.query.filter_by(intake_id=intake_id).first()

            if not child:
                raise Exception("Child with intake_id {} not found".format(intake_id))

            # Retrieve all providers associated with the child
            providers = child.providers

            if not providers:
                raise Exception("No providers found for child with intake_id {}".format(intake_id))

            # Convert the list of providers to a list of ProviderDTOs
            providers_dto = [ProviderDTO(**provider.to_dict()) for provider in providers]

            return providers_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error

