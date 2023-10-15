from abc import ABC, abstractmethod


class IAttendanceRecordService(ABC):
    """
    Attendance record service interface with attendance record management methods
    """

    @abstractmethod
    def create_attendance_record(self, record):
        """
        Create a new attendance record object
        :param record: the record to be created
        :type record: CreateAttendanceRecordDTO
        :return: the created record
        :rtype: AttendanceRecordsDTO
        :raises Exception: if record creation fails
        """
        pass

    @abstractmethod
    def get_all_attendance_records(self):
        """
        Get all records
        :return: list of records
        :rtype: list of AttendanceRecordsDTO
        :raises Exception: if get all attendance records fails
        """
        pass

    @abstractmethod
    def delete_attendance_record(self, record_id):
        """
        Delete a record
        :param record_id: the id of the record to be deleted
        :type record_id: int
        :raises Exception: if delete record fails
        """
        pass

    @abstractmethod
    def update_attendance_record(self, record_id, updated_data):
        """
        Update a record
        :param record_id: the id of the record
        :type record_id: int
        :type update_data: AttendanceRecordsDTO
        :raises Exception: if update record fails
        """
        pass
