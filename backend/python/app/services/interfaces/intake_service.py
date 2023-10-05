from abc import ABC, abstractmethod


class IIntakeService(ABC):
    """
    A class to handle CRUD functionality for intakes
    """

    @abstractmethod
    def get_all_intakes(self, intake_status, page_number, page_limit=3):
        """
        Returns all intakes
        :rtype: list of IntakeDTO
        :raises Exception: if error occurs while querying database
        """
        pass

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

    @abstractmethod
    def delete_intake(self, intake_id):
        """Deletes the intake with the specified intake_id
        :param intake_id: the intake_id of the intake to be deleted
        :type intake_id: int
        :raises Exception: if intake_id is not valid or if there was an error during deletion
        """
        pass

    @abstractmethod
    def update_intake(self, intake_id, updated_data):
        """Updates the intake with new status, lead worker name, meeting notes
        :param intake_id: the intake_id of the intake to be updated
        :type intake_id: int
        :param updated_data: the new updated data object
        :type updated_data: IntakeDTO
        :return: IntakeDTO
        :rtype: IntakeDTO
        :raises Exception: if intake_id or updated_data is not valid or if an error occurs during update
        """
        pass

    @abstractmethod
    def search_intake(self, family_name):
        """
        Searches for all cases attributed to a Family Name
        """