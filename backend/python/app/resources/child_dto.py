import datetime


class ChildDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.intake_id = kwargs.get("intake_id")
        self.first_name = kwargs.get("first_name")
        self.last_name = kwargs.get("last_name")
        self.date_of_birth = kwargs.get("date_of_birth")
        self.cpin_number = kwargs.get("cpin_number")
        self.child_service_worker_id = kwargs.get("child_service_worker_id")
        self.daytime_contact_id = kwargs.get("daytime_contact_id")
        self.special_needs = kwargs.get("special_needs")
        self.has_kinship_provider = kwargs.get("has_kinship_provider")
        self.has_foster_placement = kwargs.get("has_foster_placement")


class CreateChildDTO(object):
    def __init__(self, **kwargs):
        self.intake_id = kwargs.get("intake_id")
        self.first_name = kwargs.get("first_name")
        self.last_name = kwargs.get("last_name")
        self.date_of_birth = kwargs.get("date_of_birth")
        self.cpin_number = kwargs.get("cpin_number")
        self.child_service_worker_id = kwargs.get("child_service_worker_id")
        self.daytime_contact_id = kwargs.get("daytime_contact_id")
        self.special_needs = kwargs.get("special_needs")
        self.has_kinship_provider = kwargs.get("has_kinship_provider")
        self.has_foster_placement = kwargs.get("has_foster_placement")

    def validate(self):
        error_list = []
        if self.intake_id and not type(self.intake_id) == int:
            error_list.append("The intake_id supplied is invalid")
        if not self.first_name or not type(self.first_name) == str:
            error_list.append("The first_name supplied is invalid")
        if not self.last_name or not type(self.last_name) == str:
            error_list.append("The last_name supplied is invalid")
        if self.date_of_birth and not isinstance(self.date_of_birth, datetime.date):
            error_list.append("The date_of_birth supplied is invalid")
        if self.cpin_number and not type(self.cpin_number) == str:
            error_list.append("The cpin_number supplied is invalid")
        if not self.child_service_worker_id or not type(self.child_service_worker_id) == int:
            error_list.append("The child_service_worker_id supplied is invalid")
        if not self.daytime_contact_id or not type(self.daytime_contact_id) == int:
            error_list.append("The daytime_contact_id supplied is invalid")
        if not self.special_needs or not type(self.special_needs) == str:
            error_list.append("The special_needs supplied is invalid")
        if not isinstance(self.has_foster_placement, bool):
            error_list.append("The has_foster_placement supplied is invalid")
        if not isinstance(self.has_kinship_provider, bool):
            error_list.append("The has_kinship_provider supplied is invalid")
        if self.has_foster_placement == self.has_kinship_provider:
            error_list.append(
                "has_kinship_provider and has_foster_placement cannot have the same boolean value"
            )

        return error_list
