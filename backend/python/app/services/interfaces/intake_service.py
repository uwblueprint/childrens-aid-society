from abc import ABC, abstractmethod


class IIntakeService(ABC):
    """
    A class to handle CRUD functionality for intakes
    """

    @abstractmethod
    def create_intake(self, intake):
        """Adds the specified intake to the intake table and returns
            an IntakeDTO of the new entry
        :param intake: the intake to be added
        :type intake: CreateIntakeDTO
        :return: IntakeDTO
        :rtype: IntakeDTO
        :raises Exception: if input CreateIntakeDTO is not valid or if there was an error
                           during insertion
        """
        pass
