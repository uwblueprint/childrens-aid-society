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

    # def get_providers_by_child_id(self, child_id):
    #     try:
    #         providers = Provider.query.filter_by(child_id=child_id).all()

    #         if not providers:
    #             raise Exception("Providers with child_id {} not found")

    #         providers_dto = [ProviderDTO(**provider.to_dict()) for provider in providers]
    #         return providers_dto
    #     except Exception as error:
    #         self.logger.error(str(error))
    #         raise error

