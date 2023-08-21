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

    @abstractmethod
    def get_goals_by_intake(self, intake_id, type=None):
        """Get the goals associated with a given intake id;
        If goal type specified, only return goals of given type
        :param intake_id: int of intake ID
        :param type: string of goal type (LONG_TERM/SHORT_TERM)
        :return: List of goals for given intake
        :rtype: List of GoalDTOs
        :raises Exception: If intake ID does not exist
        """
        pass

    @abstractmethod
    def delete_goal(self, goal_id):
        """Delete a goal from the database
        :param goal_id: int of goal ID
        :return: None
        :rtype: None
        :raises Exception: If goal ID does not exist
        """
        pass
