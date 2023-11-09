from abc import ABC, abstractmethod


class IChildBehaviorService(ABC):
    @abstractmethod
    def get_child_behavior(self, behavior):
        """Get the id and behavior for a child_behavior; if it doesn't exist, return None

        :param behavior: string of child_behavior
        :return: ChildBehaviorDTO
        :rtype: ChildBehaviorDTO
        :raises Exception: if behavior is invalid
        """
        pass

    def get_child_behaviors_by_child(self, child_id):
        """Get all the behaviors from database that's tied to a given child_id

        :param child_id: int of Child id
        :return: ChildBehaviorDTOs
        :rtype: list of ChildBehaviorDTO
        :raises Exception: if child_id is invalid
        """
        pass

    def get_child_behaviors_by_intake(self, child_id):
        """Get all the behaviors from database that's tied to a given child_id

        :param child_id: int of Intake id
        :return: ChildBehaviorDTOs
        :rtype: list of ChildBehaviorDTO
        :raises Exception: if child_id is invalid
        """

    def get_all_child_behaviors(self, is_default):
        """Get all the behaviors from database that match the is_default flag

        :param is_default: indicates whether or not the option is shown in the form by default
        :return: ChildBehaviorDTO
        :rtype: ChildBehaviorDTO
        :raises Exception: if is_default is invalid
        """

    def add_child_behavior(self, behavior, is_default):
        """Creates a new db object and returns the ChildBehaviorDTO if adding was successful

        :param behavior: string of behavior
        :param is_default: indicates whether or not the option is shown in the form by default
        :return: ChildBehaviorDTO
        :rtype: ChildBehaviorDTO
        :raises Exception: if behavior is invalid/adding to database fails
        """
        pass

    def delete_child_behavior(self, behavior):
        """Deletes the child_behavior from the database

        :param behavior: string of behavior
        :return: None
        :rtype: None
        :raises Exception: if an error occurs on the database side
        """
        pass
