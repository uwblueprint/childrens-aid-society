class DaytimeContactDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.name = kwargs.get("name")
        self.address = kwargs.get("address")
        self.contact_information = kwargs.get("contact_information")
        self.dismissal_time = kwargs.get("dismissal_time")


class CreateDaytimeContactDTO(object):
    def __init__(self, **kwargs):
        super.__init__(**kwargs)

    def validate(self):
        error_list = []
        if not self.name or not type(self.name) == str:
            error_list.append("The name supplied is invalid")
        if not self.contact_information or not type(self.contact_information) == str:
            error_list.append("The contact_information supplied is invalid")
        if not self.address or not type(self.address) == str:
            error_list.append("The address supplied is invalid")
        if not self.dismissal_time or not type(self.dismissal_time) == str:
            error_list.append("The dismissal_time supplied is invalid")

        return error_list
