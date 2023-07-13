from abc import ABC, abstractmethod


class IVisitCadenceService(ABC):
    """
    Caregiver service interface with caregiver management methods
    """

    @abstractmethod
    def create_cadence(self, cadence):
        """
        Create a new cadence object
        :param cadence: the cadence to be created
        :type cadence: CreateVisitCadenceDTO
        :return: the created cadence
        :rtype: VisitCadenceDTO
        :raises Exception: if cadence creation fails
        """
        pass

    @abstractmethod
    def get_all_cadences(self):
        """
        Get all cadences
        :return: list of cadences
        :rtype: list of VisitCadenceDTO
        :raises Exception: if get all cadences fails
        """
        pass

    @abstractmethod
    def delete_cadence(self, cadence_id):
        """
        Delete a cadence
        :param cadence_id: the id of the cadence to be deleted
        :type cadence_id: int
        :raises Exception: if delete cadence fails
        """
        pass
