from abc import ABC, abstractmethod


class IBranchService(ABC):
    """
    A class to handle CRUD functionality for branches
    """

    @abstractmethod
    def get_branch(self, branch):
        """Get the id for a branch; if it doesn't exist,
        return None
        :param branch: branch to be queried
        :type: string
        :return: BranchDTO / None
        :rtype: BranchDTO / None
        :raises Exception: if branch is invalid
        """
        pass

    @abstractmethod
    def add_new_branch(self, branch, is_default):
        """
        Adds the specified bvranch to the branch table and returns a BranchDTO of the new entry
        :param branch: the branch to be added
        :type branch: string
        :param is_default: indicates whether or not the option is shown in the form by default
        :type is_default: bool
        :return: BranchDTO
        :rtype: BranchDTO
        :raises Exception: if adding record to db fails
        """
        pass

    @abstractmethod
    def get_branches(self):
        """Fetches all branches in the database

        :return: List of branches
        :rtype: List of BranchDTO
        :raises Exception: if querying database fails
        """
        pass
