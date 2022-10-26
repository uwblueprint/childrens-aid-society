import datetime
import re


class CaregiverDTO:
    def __init__(
        self,
        id,
        name,
        date_of_birth,
        primary_phone_number,
        email,
        address,
        relationship_to_child,
        intake_id,
        individual_considerations=None,
        secondary_phone_number=None,
        additional_contact_notes=None,
    ):

        self.id = id
        self.name = name
        self.date_of_birth = date_of_birth
        self.individual_considerations = individual_considerations
        self.primary_phone_number = primary_phone_number
        self.secondary_phone_number = secondary_phone_number
        self.email = email
        self.address = address
        self.relationship_to_child = relationship_to_child
        self.additional_contact_notes = additional_contact_notes
        self.intake_id = intake_id


class CreateCaregiverDTO:
    def __init__(self, **kwargs):
        self.name = kwargs.get("name")
        self.date_of_birth = kwargs.get("date_of_birth")
        self.individual_considerations = kwargs.get("individual_considerations")
        self.primary_phone_number = kwargs.get("primary_phone_number")
        self.secondary_phone_number = kwargs.get("secondary_phone_number")
        self.email = kwargs.get("email")
        self.address = kwargs.get("address")
        self.relationship_to_child = kwargs.get("relationship_to_child")
        self.additional_contact_notes = kwargs.get("additional_contact_notes")
        self.intake_id = kwargs.get("intake_id")

    def validate(self):
        error_list = []

        if type(self.name) is str:
            if len(self.name) == 0:
                error_list.append("name must not be empty")
            if not re.match(r"^[a-zA-Z\s-]+$", self.name):
                error_list.append(
                    "name must only contain alphabets, spaces, and hyphens"
                )
        else:
            error_list.append("name must be a string")

        if type(self.date_of_birth) is datetime.date:
            if self.date_of_birth > datetime.date.today():
                error_list.append("date_of_birth must be in the past")
        else:
            error_list.append("date_of_birth must be a datetime.date")

        if self.individual_considerations is not None:
            if type(self.individual_considerations) is str:
                if len(self.individual_considerations) == 0:
                    error_list.append("individual_considerations must not be empty")
            else:
                error_list.append("individual_considerations must be a string")

        if type(self.primary_phone_number) is str:
            if len(self.primary_phone_number) == 0:
                error_list.append("primary_phone_number must not be empty")
            # if not re.match(r"^\d{3}-\d{3}-\d{4}$", self.primary_phone_number):
            #     error_list.append(
            #         "primary_phone_number must be in the format XXX-XXX-XXXX"
            #     )
        else:
            error_list.append("primary_phone_number must be a string")

        if type(self.secondary_phone_number) is str:
            if len(self.secondary_phone_number) == 0:
                error_list.append("secondary_phone_number must not be empty")
            # if not re.match(r"^\d{3}-\d{3}-\d{4}$", self.secondary_phone_number):
            #     error_list.append(
            #         "secondary_phone_number must be in the format XXX-XXX-XXXX"
            #     )
        else:
            error_list.append("secondary_phone_number must be a string")

        if type(self.email) is str:
            if not re.match(
                r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", self.email
            ):
                error_list.append("email must be a valid email address")
        else:
            error_list.append("email must be a string")

        if type(self.address) is str:
            if len(self.address) == 0:
                error_list.append("address must not be empty")
        else:
            error_list.append("address must be a string")

        if type(self.relationship_to_child) is str:
            if len(self.relationship_to_child) == 0:
                error_list.append("relationship_to_child must not be empty")
        else:
            error_list.append("relationship_to_child must be a string")

        if self.additional_contact_notes is not None:
            if type(self.additional_contact_notes) is str:
                if len(self.additional_contact_notes) == 0:
                    error_list.append("additional_contact_notes must not be empty")
            else:
                error_list.append("additional_contact_notes must be a string")

        if type(self.intake_id) is not int:
            error_list.append("intake_id must be an integer")

        return error_list
