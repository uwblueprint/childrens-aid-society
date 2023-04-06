from abc import ABC, abstractmethod


class IAttendanceRecords(ABC):
    """
    Attendance records service interface with attendance record management methods
    """

    @abstractmethod
    def create_attendance_records(self, attendance_records):
        """
        Create a new attendance_records object
        :param attendance_records: the attendance_records to be created
        :type attendance_records: CreateAttendanceRecordsDTO
        :return: the created attendance_records
        :rtype: AttendanceRecordsDTO
        :raises Exception: if attendance_records creation fails
        """
        pass

    @abstractmethod
    def get_all_attendance_records(self):
        """
        Get all attendance_records
        :return: list of attendance_records
        :rtype: list of AttendanceRecordsDTO
        :raises Exception: if get all attendance_records fails
        """
        pass

    @abstractmethod
    def update_attendance_records(self, attendance_records_id, attendance_records):
        """
        Updates an attendance_records
        :param attendance_records_id: the id of the attendance_records to be updated
        :type attendance_records_id: int
        :param attendance_records: the attendance_records to be updated
        :type attendance_records: AttendanceRecordsDTO
        :return: the updated attendance_records
        :rtype: AttendanceRecordsDTO
        :raises Exception: if attendance_records update fails
        """
        pass

    @abstractmethod
    def delete_attendance_records(self, attendance_records_id):
        """
        Delete an attendance_records
        :param attendance_records_id: the id of the attendance_records to be deleted
        :type attendance_records_id: int
        :raises Exception: if delete attendance_records fails
        """
        pass
