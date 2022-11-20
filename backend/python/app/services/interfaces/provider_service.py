from abc import ABC, abstractmethod


class IProviderService(ABC):
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
