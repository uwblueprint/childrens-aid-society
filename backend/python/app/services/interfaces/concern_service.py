from abc import ABC, abstractmethod


class IConcernService(ABC):
    """
    A class to handle CRUD functionality for concerns
    """

    @abstractmethod
    def get_familial_concern_id(self, familial_concern):
        """Get the id for a familial_concern; if it doesn't exist, create a new
           entry and return the id

        :param familial_concern: string of familial_concern
        :return: ConcernDTO
        :rtype: ConcernDTO
        :raises Exception: if familial_concern is invalid
        """
        pass

    def get_child_concern_id(self, child_concern):
        """Get the id for a child_concern; if it doesn't exist, create a new
           entry and return the id

        :param child_concern: string of child_concern
        :return: ConcernDTO
        :rtype: ConcernDTO
        :raises Exception: if child_concern is invalid
        """
        pass
