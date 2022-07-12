from abc import ABC, abstractmethod


class ICaregiverService(ABC):
    """
    Caregiverservice interface with address management methods
    """

    @abstractmethod
    def create_caregiver(self, caregiver):
        """
        Create a new address object
        :param caregiver: the caregiver to be created
        :type caregiver: CreateCaregiverDTO
        :return: the created caregiver
        :rtype: CaregiverDTO
        :raises Exception: if caregiver creation fails
        """
        pass
