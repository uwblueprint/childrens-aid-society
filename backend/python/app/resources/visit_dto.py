class VisitDTO(object):
    def __init__(self, **kwargs):
        self.user_id = kwargs.get("user_id")
        self.case_id = kwargs.get("case_id")
        self.child_details = kwargs.get("child_details")
        self.visit_details = kwargs.get("visit_details")
        self.attendance = kwargs.get("attendance_entries")
        self.transportation = kwargs.get("transportation_entries")
        self.notes = kwargs.get("visit_notes")


class CreateVisitDTO(VisitDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if not self.user_id or not isinstance(self.user_id, int):
            error_list.append("user_id is invalid")
        if not self.child_details:
            error_list.append("childInformation is invalid")
        if not self.attendance:
            error_list.append("attendance is invalid")

        return error_list
