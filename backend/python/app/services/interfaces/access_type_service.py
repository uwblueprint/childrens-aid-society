from abc import ABC, abstractmethod


class IAccessTypeService(ABC):
    """
    AccessType interface with access type management methods
    """

    @abstractmethod
    def get_access_type(self, access_type):
        """
        Gets DTO for an access_type string. If it doesn't exist in db,
        returns None
        :param access_type: the access type to be queried
        :type access_type: string
        :return: AccessTypeDTO / None
        :rtype: AccessTypeDTO / None
        :raises Exception: if access type is invalid
        """
        pass

    @abstractmethod
    def get_access_types(self):
        """
        Fetches all access types in the db.
        :return: List of access types
        :rtype: list of AccessTypeDTO
        :raises Exception: if querying the database fails
        """
        pass

    @abstractmethod
    def add_new_access_type(self, access_type, is_default):
        """
        Adds the specified access_type to the access_types table and returns a AccessTypeDTO of the new entry
        of the access_type just added
        :param access_type: the access type to be added
        :type access_type: string
        :param is_default: indicates whether or not the option is shown in the form by default
        :type is_default: bool
        :return: AccessTypeDTO
        :rtype: AccessTypeDTO
        :raises Exception: if adding record to db fails
        """
        pass
