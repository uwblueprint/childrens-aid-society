from abc import ABC, abstractmethod


class IGoalService(ABC):
    """
    AuthService interface with user authentication methods
    """

    @abstractmethod
    def get_goals_by_intake(self, intake_id, type=None):
        pass
