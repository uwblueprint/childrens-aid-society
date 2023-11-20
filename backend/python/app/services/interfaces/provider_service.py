from abc import ABC, abstractmethod


class IProviderService(ABC):
    @abstractmethod
    def get_all_providers(self):
        """Returns all providers in the database
        :rtype: list of ProviderDTO
        :raises Exception: if an error occurs at the database level
        """
        pass

    @abstractmethod
    def create_new_provider(self, provider):
        """Adds the specified provider to the provider table and returns
            a ProviderDTO of the new entry
        :param provider: the provider to be added
        :type provider: CreateProviderDTO
        :return: ProviderDTO
        :rtype: ProviderDTO
        :raises Exception: if input CreateProviderDTO is not valid or if there was an error
                           during insertion
        """
        pass

    @abstractmethod
    def delete_provider(self, provider_id):
        """Deletes the provider with the specified id
        :param provider_id: the id of the provider to be deleted
        :type provider_id: int
        :raises Exception: if the provider with the specified id does not exist
        """
        pass

    @abstractmethod
    def get_children_by_provider(self, id):
        """Returns all children associated with a provider's ID
        :param id: the ID of the provider
        :type id: int
        :return: list of ChildDTO
        :rtype: list of  ChildDTO
        :raises Exception: if an error occurs at the database level
        """
        pass

    @abstractmethod
    def get_providers_by_child(self, child_id):
        """Returns all providers associated with a child's ID
        :param child_id: the ID of the child
        :type child_id: int
        :return: list of ProviderDTO
        :rtype: list of ProviderDTO
        :raises Exception: if an error occurs at the database level
        """
        pass
