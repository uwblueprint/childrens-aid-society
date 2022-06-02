from abc import ABC, abstractmethod


class IVisitService(ABC):
    @abstractmethod
    def do_something():
        pass
