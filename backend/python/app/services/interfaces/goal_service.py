from abc import ABC, abstractmethod


class IGoalService(ABC):
    """
    A class to handle CRUD functionality for goals
    """

    @abstractmethod
    def get_all_goals(self, type):
        """Get all goals in the database based on type
        :param type: string of type, either SHORT_TERM or LONG_TERM
        :return: List of goals in database
        :rtype: List of GoalDTOs
        :raises Exception: if goal is invalid
        """
        pass

    @abstractmethod
    def get_short_term_goal(self, goal):
        """Get the id for a short term goal; if it doesn't exist return None
        :param goal: string of goal
        :return: GoalDTO
        :rtype: GoalDTO or None
        :raises Exception: if goal is invalid
        """
        pass

    @abstractmethod
    def get_long_term_goal(self, goal):
        """Get the id for a long term goal; if it doesn't exist return None
        :param goal: string of goal
        :return: GoalDTO
        :rtype: GoalDTO or None
        :raises Exception: if goal is invalid
        """
        pass

    @abstractmethod
    def add_new_goal(self, goal, type):
        """Add a new goal to the database
        :param goal: string of goal
        :param type: string of goal type (LONG_TERM/SHORT_TERM)
        :return: GoalDTO
        :rtype: GoalDTO or None
        :raises Exception: if goal type is invalid
        """
