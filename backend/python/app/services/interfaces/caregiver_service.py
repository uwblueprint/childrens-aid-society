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
        
    @abstractmethod
    def get_caregiver_by_intake_id(self, intake_id):
        """Get the caregiver associated with a specific intake_id
        :param intake_id: the ID of the intake to retrieve the caregiver for
        :type intake_id: int
        :return: CaregiverDTO representing the caregiver for the specified intake_id
        :rtype: CaregiverDTO
        :raises Exception: if no caregiver with the specified intake_id is found or if an error occurs
                           in the database query
        """
