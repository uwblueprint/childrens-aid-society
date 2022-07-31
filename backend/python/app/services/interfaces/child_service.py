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
