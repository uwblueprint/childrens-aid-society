class VisitDTO(object):
    def __init__(self, **kwargs):
        self.user_id = kwargs.get("user_id")
        self.childInformation = kwargs.get("childInformation")
        self.visitTimestamp = kwargs.get("visitTimestamp")
        self.attendance = kwargs.get("attendance")
        self.transportation = kwargs.get("transportation")
        self.notes = kwargs.get("notes")
        self.childAndFamilySupportWorker = kwargs.get("childAndFamilySupportWorker")

    def validate(self):
        pass
