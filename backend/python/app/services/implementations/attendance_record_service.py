from ...models import db
from ...models.attendance_records import AttendanceRecords
from ...models.attendance_sheets import AttendanceSheets
from ...resources.attendance_records_dto import (
    AttendanceRecordsDTO,
    CreateAttendanceRecordsDTO,
)
from ..interfaces.attendance_record_service import IAttendanceRecordService


class AttendanceRecordService(IAttendanceRecordService):
    def __init__(self, logger):
        self.logger = logger

    def create_attendance_record(self, record):
        try:
            if not isinstance(record, CreateAttendanceRecordsDTO):
                raise Exception(
                    "Attendance Record passed is not of CreateAttendanceRecordDTO type"
                )
            if not record:
                raise Exception(
                    "Empty record DTO/None passed to create_attendance_record function"
                )
            # check for valid input fields
            error = record.validate()
            if error:
                raise Exception(error)
            new_record = AttendanceRecords(**record.__dict__)
            db.session.add(new_record)
            db.session.commit()
            return AttendanceRecordsDTO(**new_record.to_dict())
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error

    def get_attendance_record_by_intake(self, intake_id):
        try:
            attendance_sheets = AttendanceSheets.query.filter_by(
                intake_id=intake_id
            ).all()

            ids = []
            for sheet in attendance_sheets:
                ids.append(sheet.id)

            records = []
            for id in ids:
                temp_records = AttendanceRecords.query.filter_by(
                    attendance_sheet_id=id
                ).all()
                records.extend(temp_records)

            records_dto = [
                AttendanceRecordsDTO(**record.to_dict()) for record in records
            ]
            return records_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_attendance_record_by_id(self, id):
        try:
            records = AttendanceRecords.query.filter_by(attendance_sheet_id=id).all()
            records_dto = [
                AttendanceRecordsDTO(**record.to_dict()) for record in records
            ]
            return records_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_all_attendance_records(self):
        try:
            records = AttendanceRecords.query.all()
            records_dto = [
                AttendanceRecordsDTO(**record.to_dict()) for record in records
            ]
            return records_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def delete_attendance_record(self, record_id):
        try:
            record = AttendanceRecords.query.filter_by(id=record_id).first()
            if not record:
                raise Exception("Record with id {} not found".format(record_id))
            db.session.delete(record)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error

    def update_attendance_record(self, record_id: int, updated_data):
        try:
            if not record_id:
                raise Exception(
                    "Empty record id passed to update_attendance_record function"
                )
            if not isinstance(record_id, int):
                raise Exception("Record id passed is not of int type")
            
            record = AttendanceRecords.query.filter_by(id=record_id).first()
            if not record:
                raise Exception(
                    "Attendance Record with id {} not found".format(record_id)
                )

            # edit with which fields can be updated - date 
            if "date" in updated_data:
                record.date = updated_data["date"]

            db.session.commit()
            return AttendanceRecordsDTO(**record.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error
