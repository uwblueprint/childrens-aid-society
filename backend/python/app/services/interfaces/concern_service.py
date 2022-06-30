from abc import ABC, abstractmethod


class IConcernService(ABC):
    """
    A class to handle CRUD functionality for concerns
    """

    @abstractmethod
    def get_familial_concern_id(self, CreateConcernDTO):
        """Get the id and concern for a CreateConcernDTO; if it doesn't exist, create a new
           entry and return the id

        :param CreateConcernDTO: string of CreateConcernDTO
        :return: ConcernDTO
        :rtype: ConcernDTO
        :raises Exception: if CreateConcernDTO is invalid
        """
        pass

    def get_child_concern_id(self, CreateConcernDTO):
        """Get the id and concern for a CreateConcernDTO; if it doesn't exist, create a new
           entry and return the id

        :param CreateConcernDTO: string of child_concern
        :return: ConcernDTO
        :rtype: ConcernDTO
        :raises Exception: if CreateConcernDTO is invalid
        """
        pass
