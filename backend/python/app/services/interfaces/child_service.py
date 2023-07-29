from abc import ABC, abstractmethod


class IChildService(ABC):
    @abstractmethod
    def get_all_children(self):
        """Get all children
        :rtype: list of ChildDTO
        :raises Exception: if error occurs in the database layer
        """
        pass

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

    @abstractmethod
    def delete_child(self, child_id):
        """Deletes the child with the specified id from the child table
        :param child_id: the id of the child to be deleted
        :type child_id: int
        :return: None
        :rtype: None
        :raises Exception: if there was an error on the database side
        """
        pass

    @abstractmethod
    def get_child_by_intake_id(self, intake_id):
        """Get a child by its intake_id
        :param intake_id: the intake_id of the child to retrieve
        :type intake_id: str
        :return: ChildDTO
        :rtype: ChildDTO
        :raises Exception: if the child with the specified intake_id is not found or if there was an error in the database layer
        """
        pass