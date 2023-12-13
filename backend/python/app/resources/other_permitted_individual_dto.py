class OtherPermittedIndividualDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.name = kwargs.get("name")
        self.phone_number = kwargs.get("phone_number")
        self.relationship_to_child = kwargs.get("relationship_to_child")
        self.notes = kwargs.get("notes")
        self.intake_id = kwargs.get("intake_id")


class CreateOtherPermittedIndividualDTO(OtherPermittedIndividualDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if not self.name or not type(self.name) == str:
            error_list.append("The name field is invalid")
        if self.phone_number and not type(self.phone_number) == str:
            error_list.append("The phone_number field is invalid")
        if (
            not self.relationship_to_child
            or not type(self.relationship_to_child) == str
        ):
            error_list.append("The relationship_to_child field is invalid")
        if self.notes and not type(self.notes) == str:
            error_list.append("The notes field is invalid")
        if not self.intake_id or not type(self.intake_id) == int:
            error_list.append("The intake_id field is invalid")

        return error_list
