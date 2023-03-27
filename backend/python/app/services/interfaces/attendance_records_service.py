from abc import ABC, abstractmethod

class IAttendanceRecords(ABC):
    """
    Attendance record service interface with attendance record management methods
    """

    @abstractmethod
    def create_attendance_record(self, attendance_record):
        """
        Create a new attendance_record object
        :param attendance_record: the attendance_record to be created
        :type attendance_record: CreateAttendanceRecordsDTO
        :return: the created attendance_record
        :rtype: AttendanceRecordsDTO
        :raises Exception: if attendance_record creation fails
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
    def update_attendance_record(self, attendance_record_id, attendance_record):
        """
        Updates an attendance_record
        :param attendance_record_id: the id of the attendance_record to be updated
        :type attendance_record_id: int
        :param attendance_record: the attendance_record to be updated
        :type attendance_record: AttendanceRecordsDTO
        :return: the updated attendance_record
        :rtype: AttendanceRecordsDTO
        :raises Exception: if attendance_record update fails
        """
        pass

    @abstractmethod
    def delete_attendance_record(self, attendance_record_id):
        """
        Delete an attendance_record
        :param attendance_record_id: the id of the attendance_record to be deleted
        :type attendance_record_id: int
        :raises Exception: if delete attendance_record fails
        """
        pass



