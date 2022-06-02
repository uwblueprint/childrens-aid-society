from abc import ABC, abstractmethod


class IIntakeService(ABC):
    """
    A class to handle CRUD functionality for entities
    """

    @abstractmethod
    def create_entity(self, entity):
        """Create a new Entity object

        :param entity: dictionary of entity fields
        :return: dictionary of Entity object
        :rtype: dictionary
        :raises Exception: if entity fields are invalid
        """
        pass
