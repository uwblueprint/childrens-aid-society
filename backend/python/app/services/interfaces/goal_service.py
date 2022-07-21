from abc import ABC, abstractmethod


class IGoalService(ABC):
    """
    A class to handle CRUD functionality for goals
    """

    @abstractmethod
    def get_goal(self, goal):
        """Get the id for a goal; if it doesn't exist, create a new
           entry and return the id
        :param goal: string of goal
        :return: GoalDTO
        :rtype: GoalDTO
        :raises Exception: if goal is invalid
        """
        pass
