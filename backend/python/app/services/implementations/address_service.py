from ...models import db
from ...models.address import Address
from ...resources.address_dto import AddressDTO
from ..interfaces.address_service import IAddressService


class AddressService(IAddressService):
    def __init__(self, logger):
        self.logger = logger

    def create_address(self, address):
        try:
            if address:
                new_address = Address(
                    **{
                        "street_address": address.street_address,
                        "city": address.city,
                        "postal_code": address.postal_code,
                        "latitude": address.latitude,
                        "longitude": address.longitude,
                    }
                )
                db.session.add(new_address)
                db.session.commit()
                return AddressDTO(
                    new_address.id,
                    new_address.city,
                    new_address.street_address,
                    new_address.postal_code,
                    new_address.latitude,
                    new_address.longitude,
                )
            else:
                self.logger.error("Empty address DTO passed to create_address function")
                raise Exception("Empty address DTO passed to create_address function")
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error
