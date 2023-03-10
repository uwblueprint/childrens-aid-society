from enum import Enum

class Month(Enum):
    JANUARY = "January"
    FEBRUARY = "February"
    MARCH = "March"
    APRIL = "April"
    MAY = "May"
    JUNE = "June"
    JULY = "July"
    AUGUST = "August"
    SEPTEMBER = "September"
    OCTOBER = "October"
    NOVEMBER = "November"
    DECEMBER = "December"

class AttendanceSheetDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.intake_id = kwargs.get("intake_id")
        self.family_name = kwargs.get("family_name")
        self.month = kwargs.get("month")
        self.csw = kwargs.get("csw")
        self.cpw = kwargs.get("cpw")
        self.fcc = kwargs.get("fcc")

class CreateAttendanceSheetDTO(AttendanceSheetDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if type(self.family_name) is not str:
            error_list.append("The family_name supplied is not a string")
        if not isinstance(self.month, Month):
            error_list.append("The month must be a valid month")
        if type(self.csw) is not str:
            error_list.append("The csw supplied is not a string")
        if type(self.cpw) is not str:
            error_list.append("The cpw supplied is not a string")
        if type(self.fcc) is not str:
            error_list.append("The fcc supplied is not a string")

        return error_list


