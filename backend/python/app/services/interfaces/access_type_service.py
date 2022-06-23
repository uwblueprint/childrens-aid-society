from abc import ABC, abstractmethod


class IAccessTypeService(ABC):
    """
    AccessType interface with access type management methods
    """

    @abstractmethod
    def get_access_type(self, access_type):
        """
        Gets DTO for an access_type string. If it doesn't exist in db,
        add access type to db then return the DTO
        :param access_type: the access type to be queried
        :type access_type: string
        :return: AccessTypeDTO
        :rtype: AccessTypeDTO
        :raises Exception: if access type is invalid
        """
        pass
