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
