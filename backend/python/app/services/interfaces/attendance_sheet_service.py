from abc import ABC, abstractmethod


class IAttendanceSheetService(ABC):
    """
    Attedance sheet service interface
    """

    @abstractmethod
    def get_attendance_sheet_by_intake(self, intake_id):
        """Get attedance sheet from database tied to intake_id

        :param intake_id: int of Intake id
        :return: AttendanceSheetDTO
        :rtype: AttendanceSheetDTO
        :raises Exception: if intake_id is invalid
        """

    @abstractmethod
    def get_all_attendance_sheets(self):
        """Get all attendance sheets from data base

        :return: AttendanceSheetDTO
        :rtype: List of AttendanceSheetDTO
        :raises Exception: if an error encountered when querying database
        """

    @abstractmethod
    def create_attendance_sheet(self, attendance_sheet):
        """Creates a new db object and returns the AttendanceSheetDTO if adding was successful

        :param attendance_sheet: the attendance sheet to be created
        :type: CreateAttendanceSheetDTO
        :return: AttendanceSheetDTO
        :rtype: AttendanceSheetDTO
        :raises Exception: if behavior is invalid/adding to database fails
        """
        pass

    @abstractmethod  # TODO: finish this
    def delete_attendance_sheet(self, id):
        """Deletes the attendance sheet associated with id from the database

        :param id: the id for attendance sheet
        :type: int
        :return: None
        :rtype: None
        :raises Exception: if an error occurs on the database deletion side
        """
        pass
