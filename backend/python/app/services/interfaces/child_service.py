from abc import ABC, abstractmethod


class IChildService(ABC):
    @abstractmethod
    def add_new_child(self, child):
        """Adds the specified child to the child table and returns
            a ChildDTO of the new entry
        :param child: the child to be added
        :type child: CreateChildDTO
        :return: ChildDTO
        :rtype: ChildDTO
        :raises Exception: if input ChildDTO is not valid or if there was an error
                           while insertion
        """
        pass


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

    def add_child_behavior(self, behavior, is_default):
        """Creates a new db object and returns the ChildBehaviorDTO if adding was successful

        :param behavior: string of behavior
        :param is_default: indicates whether or not the option is shown in the form by default
        :return: ChildBehaviorDTO
        :rtype: ChildBehaviorDTO
        :raises Exception: if behavior is invalid/adding to database fails
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
