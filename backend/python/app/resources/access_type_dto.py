class AccessTypeDTO:
    def __init__(self, id, access_type):
        self.id = id
        self.access_type = access_type


class CreateAccessTypeDTO:
    def __init__(self, **kwargs):
        self.access_type = kwargs.get("access_type")

    def validate(self):
        error_list = []
        if type(self.access_type) is not str:
            error_list.append("The access_type value supplied is not a string.")
        if type(self.street_address) is str and self.access_type == "":
            error_list.append("The access_type value supplied is empty.")
        return error_list
