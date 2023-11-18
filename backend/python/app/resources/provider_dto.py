import re


class ProviderDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.intake_id = kwargs.get("intake_id")
        self.name = kwargs.get("name")
        self.file_number = kwargs.get("file_number")
        self.primary_phone_number = kwargs.get("primary_phone_number")
        self.secondary_phone_number = kwargs.get("secondary_phone_number")
        self.email = kwargs.get("email")
        self.address = kwargs.get("address")
        self.relationship_to_child = kwargs.get("relationship_to_child")
        self.additional_contact_notes = kwargs.get("additional_contact_notes")

class CreateProviderDTO(ProviderDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []
        if not self.name or not type(self.name) == str:
            error_list.append("The name supplied is invalid")
        if not self.file_number or not type(self.file_number) == str:
            error_list.append("The file number supplied is invalid")
        if not self.primary_phone_number or not type(self.primary_phone_number) == str:
            error_list.append("The primary phone number supplied is invalid")
        if not self.address or not type(self.address) == str:
            error_list.append("The address supplied is invalid")
        if (
            not self.relationship_to_child
            or not type(self.relationship_to_child) == str
        ):
            error_list.append("The relationship to child supplied is invalid")
        if not self.child_id or not type(self.child_id) == int:
            error_list.append("The child id supplied is invalid")

        # optional fields
        if self.secondary_phone_number and not type(self.secondary_phone_number) == str:
            error_list.append("The secondary phone number supplied is invalid")
        if (
            self.email
            and not type(self.email) == str
            and not re.match(r"[^@]+@[^@]+\.[^@]+", self.email)
        ):
            error_list.append("The email supplied is invalid")
        if (
            self.additional_contact_notes
            and not type(self.additional_contact_notes) == str
        ):
            error_list.append("The additional contact notes supplied is invalid")

        return error_list
