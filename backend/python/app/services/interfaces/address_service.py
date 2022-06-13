from abc import ABC, abstractmethod

class IAddressService(ABC):
    """
    AddressService interface with address management methods
    """
    @abstractmethod
    def create_address(self, address):
        """
        Create a new address object
        :param address: the address to be created
        :type address: CreateAddressDTO
        :return: the created address
        :rtype: AddressDTO
        :raises Exception: if address creation fails
        """
        pass
