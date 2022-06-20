from ...models import db
from ...models.address import Address
from ...resources.address_dto import AddressDTO, CreateAddressDTO
from ..interfaces.address_service import IAddressService


class AddressService(IAddressService):
    def __init__(self, logger):
        self.logger = logger

    def create_address(self, address):
        try:
            if not isinstance(address, CreateAddressDTO):
                raise Exception("Address passed is not of CreateAddressDTO type")
            if not address:
                raise Exception(
                    "Empty address DTO/None passed to create_address function"
                )
            # check for valid input fields
            error = address.validate()
            if error:
                raise Exception(error)
            new_address = Address(**address.__dict__)
            db.session.add(new_address)
            db.session.commit()
            return AddressDTO(**new_address.to_dict())
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error
