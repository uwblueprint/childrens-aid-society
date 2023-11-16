from abc import ABC, abstractmethod 

class IAttendanceRecordService(ABC):
    """
    Attendance record service interface
    """
    @abstractmethod
    def create_attendance_record(self, record):
        """
        :params: record
        :return: AttendanceRecordsDTO
        :rtype: AttendanceRecordsDTO
        :raised Exception if, record is not valid 
        """
        pass
    @abstractmethod
    def get_all_attendance_records(self):
        """Get attendance record from database

        :params none
        :return: AttendanceRecordsDTO
        :rtype: AttendanceRecordsDTO
        """
        pass
    @abstractmethod
    def delete_attendance_record(self, record_id):
        """
        :params: record_id
        :return: 
        :rtype: 
        :raised Exception if, record is not valid or is not found 
        """
        pass
    @abstractmethod
    def update_attendance_record(self, record_id: int, updated_data):
        """
        :params: record_id, updated_data 
        :return: 
        :rtype: 
        :raised Exception if, record_id is not of type int, is empty record, or record with id is not found.
        """
        pass