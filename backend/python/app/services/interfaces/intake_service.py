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
