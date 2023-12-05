class ChildDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.intake_id = kwargs.get("intake_id")
        self.name = kwargs.get("name")
        self.date_of_birth = kwargs.get("date_of_birth")
        self.cpin_number = kwargs.get("cpin_number")
        self.service_worker = kwargs.get("service_worker")
        self.daytime_contact_id = kwargs.get("daytime_contact_id")
        self.special_needs = kwargs.get("special_needs")


class CreateChildDTO(ChildDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []
        if not self.name or not type(self.name) == str:
            error_list.append("The name supplied is invalid")
        if not self.service_worker or not type(self.service_worker) == str:
            error_list.append("The service_worker supplied is invalid")
        if not self.daytime_contact_id or not type(self.daytime_contact_id) == int:
            error_list.append("The daytime_contact_id supplied is invalid")
        if not self.special_needs or not type(self.special_needs) == str:
            error_list.append("The special_needs supplied is invalid")

        # optional args
        if self.intake_id and not type(self.intake_id) == int:
            error_list.append("The intake_id supplied is invalid")
        if self.date_of_birth:
            if not type(self.date_of_birth) == str:
                error_list.append("The date_of_birth supplied is invalid")
        if self.cpin_number and not type(self.cpin_number) == str:
            error_list.append("The cpin_number supplied is invalid")

        return error_list
