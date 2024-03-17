class VisitDTO(object):
    def __init__(self, **kwargs):
        self.user_id = kwargs.get("user_id")
        self.childInformation = kwargs.get("childInformation")
        self.visitTimestamp = kwargs.get("visitTimestamp")
        self.attendance = kwargs.get("attendance")
        self.transportation = kwargs.get("transportation")
        self.notes = kwargs.get("notes")
        self.childAndFamilySupportWorker = kwargs.get("childAndFamilySupportWorker")


class CreateVisitDTO(VisitDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if not self.user_id or not isinstance(self.user_id, int):
            error_list.append("user_id is invalid")
        if not self.childInformation:
            error_list.append("childInformation is invalid")
        if not self.visitTimestamp:
            error_list.append("visitTimestamp is invalid")
        if not self.attendance:
            error_list.append("attendance is invalid")
        if not self.transportation:
            error_list.append("transportation is invalid")
        if not self.notes:
            error_list.append("notes is invalid")
        if not self.childAndFamilySupportWorker:
            error_list.append("childAndFamilySupportWorker is invalid")

        return error_list
