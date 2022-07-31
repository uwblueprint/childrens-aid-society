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
        error = self.validate(**kwargs)
        if error:
            raise Exception(error)
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

    def validate(self, **kwargs):
        intake_id = kwargs.get("intake_id")
        first_name = kwargs.get("first_name")
        last_name = kwargs.get("last_name")
        date_of_birth = kwargs.get("date_of_birth")
        cpin_number = kwargs.get("cpin_number")
        child_service_worker_id = kwargs.get("child_service_worker_id")
        daytime_contact_id = kwargs.get("daytime_contact_id")
        special_needs = kwargs.get("special_needs")
        has_kinship_provider = kwargs.get("has_kinship_provider")
        has_foster_placement = kwargs.get("has_foster_placement")
        error_list = []
        if not intake_id or not type(intake_id) == int:
            error_list.append("The intake_id supplied is invalid")
        if not first_name or not type(first_name) == str:
            error_list.append("The first_name supplied is invalid")
        if not last_name or not type(last_name) == str:
            error_list.append("The last_name supplied is invalid")
        if not date_of_birth or not isinstance(date_of_birth, datetime.date):
            error_list.append("The date_of_birth supplied is invalid")
        if not cpin_number or not type(cpin_number) == str:
            error_list.append("The cpin_number supplied is invalid")
        if not child_service_worker_id or not type(child_service_worker_id) == int:
            error_list.append("The child_service_worker_id supplied is invalid")
        if not daytime_contact_id or not type(daytime_contact_id) == int:
            error_list.append("The daytime_contact_id supplied is invalid")
        if not special_needs or not type(special_needs) == str:
            error_list.append("The special_needs supplied is invalid")
        if not isinstance(has_foster_placement, bool):
            error_list.append("The has_foster_placement supplied is invalid")
        if not isinstance(has_kinship_provider, bool):
            error_list.append("The has_kinship_provider supplied is invalid")
        if has_foster_placement == has_kinship_provider:
            error_list.append(
                "has_kinship_provider and has_foster_placement cannot have the same boolean value"
            )

        return error_list
