from enum import Enum


class Supervision(Enum):
    FULL = "FULL"
    PARTIAL = "PARTIAL"
    UNSUPERVISED = "UNSUPERVISED"


class Attendance(Enum):
    PRESENT = "PRESENT"
    CANCELLED = "CANCELLED"
    NO_SHOW = "NO_SHOW"


class Attending_parent(Enum):
    MOM = "MOM"
    DAD = "DAD"


class AttendanceRecordsDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.attendance_sheet_id = kwargs.get("attendance_sheet_id")
        self.supervision = kwargs.get("supervision")
        self.date = kwargs.get("date")
        self.start_time = kwargs.get("start_time")
        self.end_time = kwargs.get("end_time")
        self.location = kwargs.get("location")
        self.attendance = kwargs.get("attendance")
        self.attending_parent = kwargs.get("attending_parent")
        self.staff_transport_time_min = kwargs.get("staff_transport_time_min")
        self.driver_transport_time_min = kwargs.get("driver_transport_time_min")
        self.foster_parent_transport_time_min = kwargs.get(
            "foster_parent_transport_time_min"
        )
        self.child_family_support_worker_id = kwargs.get(
            "child_family_support_worker_id"
        )
        self.comments = kwargs.get("comments")


class AttendanceRecordsDTO(AttendanceRecordsDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if not self.attendance_sheet_id or type(self.attendance_sheet_id) is not int:
            error_list.append("attendance_sheet_id is not an integer")

        if type(self.supervision) is str:
            if not isinstance(self.supervision, Supervision):
                error_list.append("must be a valid supervision")
            elif len(self.supervision) == 0:
                error_list.append("supervision must not be empty")
        else:
            error_list.append("supervision must be a string")

        if type(self.date) is not str:
            # add additional datetime validation
            error_list.append("date must be a string")

        if type(self.start_time) is not str:
            # add additional datetime validation
            error_list.append("start_time must be a string")

        if type(self.end_time) is not str:
            # add additional datetime validation
            error_list.append("end_time must be a string")

        if type(self.location) is not str:
            error_list.append("location must be a list")

        if type(self.attendance) is str:
            if not isinstance(self.attendance, Attendance):
                error_list.append("must be a valid attendance")
            elif len(self.attendance) == 0:
                error_list.append("attendance must not be empty")
        else:
            error_list.append("attendance must be a string")

        if type(self.attending_parent) is str:
            if not isinstance(self.attending_parent, Attendance):
                error_list.append("must be a valid attending_parent")
            elif len(self.attending_parent) == 0:
                error_list.append("attending_parent must not be empty")
        else:
            error_list.append("attending_parent must be a string")

        if type(self.staff_transport_time_min) is int:
            if self.staff_transport_time_min < 0:
                error_list.append("staff_transport_time_min must be non-negative")
        else:
            error_list.append("staff_transport_time_min must be an integer")

        if type(self.driver_transport_time_min) is int:
            if self.driver_transport_time_min < 0:
                error_list.append("driver_transport_time_min must be non-negative")
        else:
            error_list.append("driver_transport_time_min must be an integer")

        if type(self.foster_parent_transport_time_min) is int:
            if self.foster_parent_transport_time_min < 0:
                error_list.append(
                    "foster_parent_transport_time_min must be non-negative"
                )
        else:
            error_list.append("foster_parent_transport_time_min must be an integer")

        if type(self.comments) is not str:
            error_list.append("comments must be a string")
