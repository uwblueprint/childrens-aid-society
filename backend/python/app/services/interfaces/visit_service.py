from abc import ABC, abstractmethod


class IVisitService(ABC):
    @abstractmethod
    def create_visit(self):
        pass
