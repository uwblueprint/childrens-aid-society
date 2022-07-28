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

    def add_concern(self, type, concern):
        """Creates a new db object and returns the ConcernDTO if adding was successful

        :param concern: string of concern, type: type of concern
        :return: ConcernDTO
        :rtype: ConcernDTO
        :raises Exception: if concern is invalid
        """
        pass
