from abc import ABC, abstractmethod


class ITransportationMethodService(ABC):
    """
    A class to handle CRUD functionality for transportation methods
    """

    @abstractmethod
    def get_transportation_method(self, method):
        """Check if transport method exists in DB and
           return the capitalized transport method if it exists
           and return None if it does not

        :param transport_method: transportation_method to be queried
        :type: string
        :return: TransportationMethodDTO / None
        :rtype: TransportationMethodDTO / None
        :raises Exception: if transport method is invalid
        """
        pass

    @abstractmethod
    def get_transportation_methods(self):
        """Get all exisiting transportation methods
        :return: List of transportation methods
        :rtype: list of TransportationMethodDTOs
        :raises Exception: if querying database fails
        """
        pass

    @abstractmethod
    def add_new_transportation_method(self, method, is_default):
        """Adds the specified method to the transportation_models table and returns a TransportationMethodDTO of the new entry
        :param transportation_method: transporation method to be added
        :type: string
        :param is_default: indicates whether or not the option is shown in the form by default
        :type is_default: bool
        :return: TransportationMethodDTO
        :rtype: TransportationMethodDTO
        :raises Exception: if adding to database fails
        """
        pass
