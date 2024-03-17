from abc import ABC, abstractmethod


class IVisitService(ABC):
    """
    A class to handle CRUD functionality for visits
    """

    @abstractmethod
    def create_visit(self, intake):
        # TODO: Create docstrings
        pass
