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
