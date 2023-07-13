class VisitCadenceDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.date = kwargs.get("date")
        self.time = kwargs.get("time")
        self.frequency = kwargs.get("frequency")
        self.family_member = kwargs.get("family_member")
        self.notes = kwargs.get("notes")
        self.intake_id = kwargs.get("intake_id")
        self.child_id = kwargs.get("child_id")


class CreateVisitCadenceDTO(VisitCadenceDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []
        if not self.date or not type(self.date) == str:
            error_list.append("The date supplied is invalid")
        if not self.time or not type(self.time) == str:
            error_list.append("The time supplied is invalid")
        if not self.frequency or not type(self.frequency) == str:
            error_list.append("The frequency supplied is invalid")
        if not self.family_member or not type(self.family_member) == int:
            error_list.append("The family_member supplied is invalid")

        # optional args
        if self.intake_id and not type(self.intake_id) == int:
            error_list.append("The intake_id supplied is invalid")
        if self.child_id and not type(self.child_id) == int:
            error_list.append("The child_id supplied is invalid")
        if self.notes and not type(self.notes) == str:
            error_list.append("The notes supplied is invalid")

        return error_list
