from ...models import db
from ...models.attendance_records import AttendanceRecords
from ...resources.attendance_records_dto import AttendanceRecordsDTO
from ..interfaces.attendance_records_service import IAttendanceRecords


class AttendanceRecords(IAttendanceRecords):
    def __init__(self, logger):
        self.logger = logger

    def create_attendance_records(self, attendance_records):
        pass

    def get_all_attendance_records(self):
        pass

    def update_attendance_records(self, attendance_records_id, attendance_records):
        try:
            old_attendance_records = AttendanceRecords.query.filter_by(
                id=attendance_records_id
            ).first()
            if not old_attendance_records:
                raise Exception(
                    "Attendance_records with id {} not found".format(
                        attendance_records_id
                    )
                )
            if not isinstance(attendance_records, AttendanceRecordsDTO):
                raise Exception(
                    "Attendance_records passed is not of AttendanceRecordsDTO type"
                )
            old_attendance_records = attendance_records
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error

    def delete_attendance_records(self, attendance_records_id):
        try:
            attendance_records = AttendanceRecords.query.filter_by(
                id=attendance_records_id
            ).first()
            if not attendance_records:
                raise Exception(
                    "Attendance_records with id {} not found".format(
                        attendance_records_id
                    )
                )
            db.session.delete(attendance_records)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error
