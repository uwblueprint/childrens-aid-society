from abc import ABC, abstractmethod


class IBranchService(ABC):
    """
    A class to handle CRUD functionality for branches
    """

    @abstractmethod
    def get_branch(self, branch):
        """Get the id for a branch; if it doesn't exist, create a new
           entry and return the id

        :param branch: string of branch
        :return: BranchDTO
        :rtype: BranchDTO
        :raises Exception: if branch is invalid
        """
        pass

    @abstractmethod
    def get_branches(self):
        """Add branch to DB and return the id

        :param branch: None
        :return: List of branches
        :rtype: list
        :raises Exception: if querying database fails
        """
        pass
