from abc import ABC, abstractmethod


class IConcernService(ABC):
    """
    A class to handle CRUD functionality for concerns
    """

    @abstractmethod
    def get_familial_concern(self, familial_concern):
        """Get the id and concern for a familial_concern; if it doesn't exist, return None

        :param familial_concern: string of familial_concern
        :return: ConcernDTO
        :rtype: ConcernDTO
        :raises Exception: if familial_concern is invalid
        """
        pass

    def get_child_concern(self, child_concern):
        """Get the id and concern for a child_concern; if it doesn't exist, return None

        :param child_concern: string of child_concern
        :return: ConcernDTO
        :rtype: ConcernDTO
        :raises Exception: if child_concern is invalid
        """
        pass

    def add_familial_concern(self, familial_concern):
        """Creates a new db object and returns the ConcernDTO if adding was successful

        :param familial_concern: string of familial_concern
        :return: ConcernDTO
        :rtype: ConcernDTO
        :raises Exception: if familial_concern is invalid
        """
        pass

    def add_child_concern(self, child_concern):
        """Creates a new db object and returns the ConcernDTO if adding was successful

        :param child_concern: string of child_concern
        :return: ConcernDTO
        :rtype: ConcernDTO
        :raises Exception: if child_concern is invalid
        """
        pass

    def get_concerns_by_intake(self, intake_id, type=nil):

        """Get all the concerns from database that's tied to a given intake_id

        :param intake_id:
        :param type:
        :return:
        """
        return Concern
        where
        intake_id = intake_id and type = type if type