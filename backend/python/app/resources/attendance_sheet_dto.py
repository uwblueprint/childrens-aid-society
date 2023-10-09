from enum import Enum


class AttendanceSheetDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.intake_id = kwargs.get("intake_id")
        self.family_name = kwargs.get("family_name")
        self.csw = kwargs.get("csw")
        self.cpw = kwargs.get("cpw")
        self.fcc = kwargs.get("fcc")
        self.children = kwargs.get("children")


class CreateAttendanceSheetDTO(AttendanceSheetDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if self.id and type(self.id) is not int:
            error_list.append("The id supplied is not an int")
        if type(self.intake_id) is not int or not self.intake_id:
            error_list.append("The intake_id supplied is not an int")
        if type(self.family_name) is not str:
            error_list.append("The family_name supplied is not a string")
        if type(self.csw) is not str:
            error_list.append("The csw supplied is not a string")
        if type(self.cpw) is not str:
            error_list.append("The cpw supplied is not a string")
        if type(self.fcc) is not str:
            error_list.append("The fcc supplied is not a string")

        return error_list
