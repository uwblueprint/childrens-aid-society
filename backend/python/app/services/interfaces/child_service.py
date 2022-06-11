from abc import ABC, abstractmethod


class IChildService(ABC):
    @abstractmethod
    def create_child(self):
        pass
