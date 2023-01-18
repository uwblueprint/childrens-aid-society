from abc import ABC, abstractmethod


class ICaregiverService(ABC):
    """
    Caregiver service interface with caregiver management methods
    """

    @abstractmethod
    def create_caregiver(self, caregiver):
        """
        Create a new caregiver object
        :param caregiver: the caregiver to be created
        :type caregiver: CreateCaregiverDTO
        :return: the created caregiver
        :rtype: CaregiverDTO
        :raises Exception: if caregiver creation fails
        """
        pass

    @abstractmethod
    def get_all_caregivers(self):
        """
        Get all caregivers
        :return: list of caregivers
        :rtype: list of CaregiverDTO
        :raises Exception: if get all caregivers fails
        """
        pass

    @abstractmethod
    def delete_caregiver(self, caregiver_id):
        """
        Delete a caregiver
        :param caregiver_id: the id of the caregiver to be deleted
        :type caregiver_id: int
        :raises Exception: if delete caregiver fails
        """
        pass
