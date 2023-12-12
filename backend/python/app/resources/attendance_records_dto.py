from enum import Enum


class Supervision(Enum):
    FULL = "FULL"
    PARTIAL = "PARTIAL"
    UNSUPERVISED = "UNSUPERVISED"


class Attendance(Enum):
    PRESENT = "PRESENT"
    CANCELLED = "CANCELLED"
    NO_SHOW = "NO_SHOW"


class Attending_family(Enum):
    FOSTER_CAREGIVER = "FOSTER_CAREGIVER"
    KINSHIP_CAREGIVER = "KINSHIP_CAREGIVER"
    BIOLOGICAL_FAMILY = "BIOLOGICAL_FAMILY"
    ADOPTIVE_PARENT = "ADOPTIVE_PARENT"
    FOSTER_PARENT = "FOSTER_PARENT"
    BIOLOGICAL_PARENT = "BIOLOGICAL_PARENT"
    STEP_PARENT = "STEP_PARENT"
    MATERNAL_GRANDPARENT = "MATERNAL_GRANDPARENT"
    PATERNAL_GRANDPARENT = "PATERNAL_GRANDPARENT"
    SIBLING = "SIBLING"
    STEP_SIBLING = "STEP_SIBLING"
    HALF_SIBLING = "HALF_SIBLING"
    UNCLE_AUNT = "UNCLE/AUNT"
    OTHER_RELATIVE = "OTHER_RELATIVE"
    OTHER = "OTHER"


class AttendanceRecordsDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.attendance_sheet_id = kwargs.get("attendance_sheet_id")
        self.visit_date = kwargs.get("visit_date")
        self.visit_day = kwargs.get("visit_day")
        self.visit_supervision = kwargs.get("visit_supervision")
        self.start_time = kwargs.get("start_time")
        self.end_time = kwargs.get("end_time")
        self.location = kwargs.get("location")
        self.visiting_members = kwargs.get("visiting_members")
        self.transportation = kwargs.get("transportation")
        self.staff_transport_time_min = kwargs.get("staff_transport_time_min")
        self.driver_transport_time_min = kwargs.get("driver_transport_time_min")
        self.foster_parent_transport_time_min = kwargs.get(
            "foster_parent_transport_time_min"
        )
        self.notes = kwargs.get("notes")
        self.child_family_support_worker_id = kwargs.get(
            "child_family_support_worker_id"
        )
        self.user = kwargs.get("user")


class VisitingMemberDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.attendance_record_id = kwargs.get("attendance_record_id")
        self.visitor_relationship = kwargs.get("visitor_relationship")
        self.description = kwargs.get("description")
        self.visiting_member_name = kwargs.get("visiting_member_name")
        self.visit_attendance = kwargs.get("visit_attendance")
        self.reason_for_absence = kwargs.get("reason_for_absence")


class TransportationDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.attendance_record_id = kwargs.get("attendance_record_id")
        self.guardian = kwargs.get("guardian")
        self.name = kwargs.get("name")
        self.duration = kwargs.get("duration")


class CreateAttendanceRecordsDTO(AttendanceRecordsDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if not self.attendance_sheet_id or type(self.attendance_sheet_id) is not int:
            error_list.append("attendance_sheet_id is not an integer")

        if type(self.visit_date) is not str:
            # add additional datetime validation
            error_list.append("date must be a string")

        if type(self.visit_day) is not str:
            # add additional datetime validation
            error_list.append("day must be a string")

        if type(self.visit_supervision) is str:
            if not isinstance(self.visit_supervision, Supervision):
                error_list.append("must be a valid supervision")
        else:
            error_list.append("supervision must be a string")

        if type(self.start_time) is not str:
            # add additional datetime validation
            error_list.append("start_time must be a string")

        if type(self.end_time) is not str:
            # add additional datetime validation
            error_list.append("end_time must be a string")

        if type(self.location) is not str:
            error_list.append("location must be a string")

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

        if type(self.notes) is not str:
            error_list.append("notes must be a string")

        if type(self.child_family_support_worker_id) is not int:
            error_list.append("child_family_support_worker_id must be an integer")


class CreateVisitingMemberDTO(VisitingMemberDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if not self.attendance_record_id or type(self.attendance_record_id) is not int:
            error_list.append("attendance_record_id is not an integer")

        if type(self.visitor_relationship) is str:
            if not isinstance(self.visitor_relationship, Attending_family):
                error_list.append("must be a valid attending_family")
        else:
            error_list.append("attending_family must be a string")

        if type(self.description) is not str:
            error_list.append("description must be a string")

        if type(self.visiting_member_name) is not str:
            error_list.append("visiting_member_name must be a string")

        if type(self.visit_attendance) is str:
            if not isinstance(self.visit_attendance, Attendance):
                error_list.append("must be a valid attendance")
        else:
            error_list.append("attendance must be a string")

        if type(self.reason_for_absence) is not str:
            error_list.append("reason_for_absence must be a string")


class CreateTransportationDTO(TransportationDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if not self.attendance_record_id or type(self.attendance_record_id) is not int:
            error_list.append("attendance_record_id is not an integer")

        if type(self.guardian) is not str:
            error_list.append("guardian must be a string")

        if type(self.name) is not str:
            error_list.append("name must be a string")

        if type(self.duration) is int:
            if self.duration < 0:
                error_list.append("duration must be non-negative")
        else:
            error_list.append("duration must be an integer")
