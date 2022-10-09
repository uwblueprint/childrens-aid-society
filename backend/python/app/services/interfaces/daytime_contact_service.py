from abc import ABC, abstractmethod


class IDaytimeContactService(ABC):
    @abstractmethod
    def create_new_daytime_contact(self, contact):
        """Adds the specified contact to the daytime_contact table and returns
            a DaytimeContactDTO of the new entry
        :param contact: the contact to be added
        :type contact: CreateDaytimeContactDTO
        :return: DaytimeContactDTO
        :rtype: DaytimeContactDTO
        :raises Exception: if input CreateDaytimeContactDTO is not valid or if there was an error
                           while insertion
        """
        pass
