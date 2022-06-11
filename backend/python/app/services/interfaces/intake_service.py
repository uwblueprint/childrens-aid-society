from abc import ABC, abstractmethod


class IIntakeService(ABC):
    """
    A class to handle CRUD functionality for intakes
    """

    @abstractmethod
    def create_intake(self, intake):
        """Create a new Intake object

        :param intake: dictionary of intake fields
        :return: dictionary of Intake object
        :rtype: dictionary
        :raises Exception: if intake fields are invalid
        """
        pass

    @abstractmethod
    def _get_transport_method_id(self, transport_method):
        """Get the id for a transport method; if it doesn't exist, create a new
           entry and return the id

        :param transport_method: string of transportation_method
        :return: TransportationMethodDTO
        :rtype: TransportationMethodDTO
        :raises Exception: if transport method is invalid
        """
        pass
