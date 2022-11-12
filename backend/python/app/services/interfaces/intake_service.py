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


class IFamilialConcernService(ABC):
    """
    A class to handle CRUD functionality for concerns
    """

    @abstractmethod
    def get_familial_concern(self, concern):
        """Get the id and concern for a familial_concern; if it doesn't exist, return None

        :param concern: string of familial_concern
        :return: FamilialConcernDTO
        :rtype: FamilialConcernDTO
        :raises Exception: if concern is invalid
        """
        pass

    def add_familial_concern(self, concern, is_default):
        """Creates a new db object and returns the FamilialConcernDTO if adding was successful

        :param concern: string of concern
        :param is_default: indicates whether or not the option is shown in the form by default
        :return: FamilialConcernDTO
        :rtype: FamilialConcernDTO
        :raises Exception: if concern is invalid/adding to database fails
        """
        pass

    def get_familial_concerns_by_intake(self, intake_id):
        """Get all the concerns from database that's tied to a given intake_id

        :param intake_id: int of Intake id
        :return: FamilialConcernDTOs
        :rtype: list of FamilialConcernDTO
        :raises Exception: if intake_id is invalid
        """

    def get_all_familial_concerns(self, is_default):
        """Get all the concerns from database that match the is_default flag

        :param is_default: indicates whether or not the option is shown in the form by default
        :return: FamilialConcernDTO
        :rtype: FamilialConcernDTO
        :raises Exception: if is_default is invalid
        """
