from abc import ABC, abstractmethod


class ITransportationMethodService(ABC):
    """
    A class to handle CRUD functionality for transportation methods
    """

    @abstractmethod
    def _get_transport_method(self, transport_method):
        """Check if transport method exists in DB/add to DB if it does not and
           return the capitalized transport method

        :param transport_method: string of transportation_method
        :return: TransportationMethodDTO
        :rtype: TransportationMethodDTO
        :raises Exception: if transport method is invalid
        """
        pass

    @abstractmethod
    def _add_transport_method(self, transport_method):
        """Add transport_method to DB and return capitalized transport method

        :param transport_method: string of transportation_method
        :return: TransportationMethodDTO
        :rtype: TransportationMethodDTO
        :raises Exception: if addition of DTO to database fails
        """
        pass

    @abstractmethod
    def get_transportation_methods(self):
        """Add transport_method to DB and return capitalized transport method

        :param transport_method: None
        :return: List of transportation methods
        :rtype: list
        :raises Exception: if querying database fails
        """
        pass
