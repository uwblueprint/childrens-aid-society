from abc import ABC, abstractmethod


class IOtherPermittedIndividualService(ABC):
    @abstractmethod
    def create_new_other_permitted_individual(self, other_permitted_individual):
        """Adds the specified other_permitted_individual to the other_permitted_individual table and returns
            a OtherPermittedIndividualDTO of the new entry
        :param other_permitted_individual: the other_permitted_individual to be added
        :type other_permitted_individual: CreateOtherPermittedIndividualDTO
        :return: OtherPermittedIndividualDTO
        :rtype: OtherPermittedIndividualDTO
        :raises Exception: if input CreateOtherPermittedIndividualDTO is not valid or if there was an error
                           during insertion
        """
        pass
