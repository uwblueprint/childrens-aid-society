class DaytimeContactDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.contact_first_name = kwargs.get("contact_first_name")
        self.contact_last_name = kwargs.get("contact_last_name")
        self.address_id = kwargs.get("address_id")
        self.phone_number = kwargs.get("phone_number")

class CreateDaytimeContactDTO(object):
    def __init__(self, **kwargs):
        self.contact_first_name = kwargs.get("contact_first_name")
        self.contact_last_name = kwargs.get("contact_last_name")
        self.address_id = kwargs.get("address_id")
        self.phone_number = kwargs.get("phone_number")

    def validate(self):
        error_list = []
        if not self.contact_first_name or not type(self.contact_first_name) == str:
            error_list.append("The contact_first_name supplied is invalid")
        if not self.contact_last_name or not type(self.contact_last_name) == str:
            error_list.append("The contact_last_name supplied is invalid")
        if not self.address_id or not type(self.address_id) == int:
            error_list.append("The address_id supplied is invalid")
        if not self.phone_number or not type(self.phone_number) == str:
            error_list.append("The phone_number supplied is invalid")

        return error_list
