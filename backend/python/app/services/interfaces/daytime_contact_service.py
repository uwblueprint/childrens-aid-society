from abc import ABC, abstractmethod


class IDaytimeContactService(ABC):
    @abstractmethod
    def get_all_daytime_contacts(self):
        """Get all daytime contacts
        :rtype: list of DaytimeContactDTO
        :raises Exception: if error occurs in the database layer
        """
        pass

    @abstractmethod
    def create_new_daytime_contact(self, contact):
        """Adds the specified contact to the daytime_contact table and returns
            a DaytimeContactDTO of the new entry
        :param contact: the contact to be added
        :type contact: CreateDaytimeContactDTO
        :return: DaytimeContactDTO
        :rtype: DaytimeContactDTO
        :raises Exception: if input CreateDaytimeContactDTO is not valid or if there was an error
                           during insertion
        """
        pass

    @abstractmethod
    def delete_daytime_contact(self, daytime_contact_id):
        """Deletes the specified contact from the daytime_contact table
        :param daytime_contact_id: the id of the contact to be deleted
        :type daytime_contact_id: int
        :return: None
        :rtype: None
        :raises Exception: if input daytime_contact_id is not valid or if there was an error
                           during deletion
        """
        pass
