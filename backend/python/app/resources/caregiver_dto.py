import datetime

class CaregiverDTO:
    def __init__(self, id, type, first_name, last_name, is_primary,
                child_id, address_id, relationship_to_child, phone_number,
                cpin_number, date_of_birth, special_needs, name_of_child,
                kinship_worker_name, kinship_worker_ext, foster_care_coord_name,
                foster_care_coord_ext, limitations_for_access, address, child):

        self.id = id
        self.type = type
        self.first_name = first_name
        self.last_name = last_name
        self.is_primary = is_primary
        self.child_id = child_id
        self.address_id = address_id
        self.relationship_to_child = relationship_to_child
        self.phone_number = phone_number
        self.cpin_number = cpin_number
        self.date_of_birth = date_of_birth
        self.special_needs = special_needs
        self.name_of_child = name_of_child
        self.kinship_worker_name = kinship_worker_name
        self.kinship_worker_ext = kinship_worker_ext
        self.foster_care_coord_name = foster_care_coord_name
        self.foster_care_coord_ext = foster_care_coord_ext
        self.limitations_for_access = limitations_for_access


class CreateCaregiverDTO:
    def __init__(self, **kwargs):
        self.type = kwargs.get("type")
        self.first_name = kwargs.get("first_name")
        self.last_name = kwargs.get("last_name")
        self.is_primary = kwargs.get("is_primary")
        self.child_id = kwargs.get("child_id")
        self.address_id = kwargs.get("address_id")
        self.relationship_to_child = kwargs.get("relationship_to_child")
        self.phone_number = kwargs.get("phone_number")
        self.cpin_number = kwargs.get("cpin_number")
        self.date_of_birth = kwargs.get("date_of_birth")
        self.special_needs = kwargs.get("special_needs")
        self.name_of_child = kwargs.get("name_of_child")
        self.kinship_worker_name = kwargs.get("kinship_worker_name")
        self.kinship_worker_ext = kwargs.get("kinship_worker_ext")
        self.foster_care_coord_name = kwargs.get("foster_care_coord_name")
        self.foster_care_coord_ext = kwargs.get("foster_care_coord_ext")
        self.limitations_for_access = kwargs.get("limitations_for_access")

    def validate(self):
        error_list = []

        if type(self.first_name) is not str:
            error_list.append("The street_address value supplied is not a string.")
        if type(self.first_name) is str and self.first_name == "":
            error_list.append("The first name value supplied is empty.")
        if type(self.last_name) is not str:
            error_list.append("The last name value supplied is not a string.")
        if type(self.last_name) is str and self.last_name == "":
            error_list.append("The last name value supplied is empty.")
        if type(self.is_primary) is not bool:
            error_list.append("The is_primary field is not of boolean type.")
        if type(self.child_id) is not int:
            error_list.append("The child id field is not of integer type.")
        if type(self.address_id) is not int:
            error_list.append("The address id field is not of integer type.")
        if type(self.phone_number) is not str:
            error_list.append("The phone number value is not a string.")
        if type(self.phone_number) is str and self.phone_number == "":
            error_list.append("Phone number cannot be empty.")
        if type(self.cpin_number) is not str:
            error_list.append("The cpin number is not a string.")
        if type(self.date_of_birth) is not datetime.datetime():
            error_list.append("The date of birth provided is not of DATE format.")
        if type(self.special_needs) is not str:
            error_list.append("The special needs value is not string.")
        if type(self.name_of_child) is not str:
            error_list.append("The name of child value is not string.")
        if type(self.kinship_worker_name) is not str:
            error_list.append("The kinship worker name value is not string.")
        if type(self.kinship_worker_ext) is not str:
            error_list.append("The kinship worker ext value is not string.")
        if type(self.foster_care_coord_name) is not str:
            error_list.append("The foster care coord name value is not string")
        if type(self.limitations_for_access) is not str:
            error_list.append("The limitations for access value supplied is not string.")
        return error_list


