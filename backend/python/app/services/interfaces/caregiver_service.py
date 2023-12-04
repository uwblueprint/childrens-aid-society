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
    def get_caregivers_by_intake_id(self, intake_id):
        """Get the caregiver associated with a specific intake_id
        :param intake_id: the ID of the intake to retrieve the caregiver for
        :type intake_id: int
        :return: list of CaregiverDTO representing the caregiver for the specified intake_id
        :rtype: list
        :raises Exception:  if an error occurs
                           in the database query
        """
        pass

    @abstractmethod
    def update_caregiver(self, caregiver_id, updated_caregiver):
        """Updates the Caregiver with new name, date of birth, individual considerations,
            primary and/or secondary phone number, email, address, relationship to child, additional contact notes
        :param Caregiver_id: the caregiver_id of the caregiver to be updated
        :type caregiver_id: int
        :param updated_caregiver: the new updated CaregiverDTO object
        :type updated_caregiver: CaregiverDTO
        :return: CaregiverDTO
        :rtype: CaregiverDTO
        :raises Exception: if caregiver_id or updated_caregiver is not valid or if an error occurs during update
        """
        pass
