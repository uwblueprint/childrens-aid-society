from ...models import db
from ...models.attendance_sheets import AttendanceSheets
from ...resources.attendance_sheet_dto import (
    AttendanceSheetDTO,
    CreateAttendanceSheetDTO,
)
from ...resources.child_dto import ChildDTO
from ..interfaces.attendance_sheet_service import IAttendanceSheetService


class AttendanceSheetService(IAttendanceSheetService):
    def __init__(self, logger):
        self.logger = logger

    def get_attendance_sheet_by_intake(self, intake_id):
        try:
            attendance_sheets = AttendanceSheets.query.filter_by(
                intake_id=intake_id
            ).all()
            attendance_sheets_dtos = [
                CreateAttendanceSheetDTO(**attendance_sheet.to_dict())
                for attendance_sheet in attendance_sheets
            ]
            return attendance_sheets_dtos
        except Exception as error:
            reason = getattr(error, "message", None)
            self.logger.error(
                "Failed to get attendance sheets by intake id. Reason = {reason}".format(
                    reason=(reason if reason else str(error))
                )
            )
            raise error

    def get_attendance_sheet_by_id(self, id):
        try:
            attendance_sheet = AttendanceSheets.query.get(id)
            attendance_sheet_dto = [
                CreateAttendanceSheetDTO(**attendance_sheet.to_dict())
            ]
            return attendance_sheet_dto
        except Exception as error:
            reason = getattr(error, "message", None)
            self.logger.error(
                "Failed to get attendance sheets by id. Reason = {reason}".format(
                    reason=(reason if reason else str(error))
                )
            )
            raise error

    def get_all_attendance_sheets(self):
        try:
            attendance_sheets = AttendanceSheets.query.all()
            attendance_sheets_dtos = [
                CreateAttendanceSheetDTO(**attendance_sheet.to_dict())
                for attendance_sheet in attendance_sheets
            ]
            return attendance_sheets_dtos
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def create_attendance_sheet(self, attendance_sheet):
        try:
            if not isinstance(attendance_sheet, CreateAttendanceSheetDTO):
                raise Exception(
                    "Attendance sheet passed is not of CreateAttendanceSheetDTO type"
                )
            if not attendance_sheet:
                raise Exception(
                    "Empty attendance sheet DTO/None passed to create_attendance_sheet function"
                )
            # check for valid input fields
            error = attendance_sheet.validate()
            if error:
                raise Exception(error)
            new_attendance_sheet = AttendanceSheets(**attendance_sheet.__dict__)
            db.session.add(new_attendance_sheet)
            db.session.commit()
            return AttendanceSheetDTO(**new_attendance_sheet.to_dict())
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error

    def delete_attendance_sheet(self, id):
        try:
            attendance_sheet = AttendanceSheets.query.filter_by(id=id).first()
            if not attendance_sheet:
                raise Exception("Attendance sheet with id {} not found".format(id))
            db.session.delete(attendance_sheet)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            self.logger.error(str(error))
            raise error

    def update_attendance_sheet(self, attendance_id: int, updated_data):
        try:
            if not attendance_id:
                raise Exception(
                    "Empty attendance id passed to update_attendance_sheet function"
                )
            if not isinstance(attendance_id, int):
                raise Exception("Sheet id passed is not of int type")
            attendance_sheet = AttendanceSheets.query.filter_by(
                id=attendance_id
            ).first()
            # attendance_sheet = AttendanceSheetService.query.filter_by(id=attendance_id).first()
            if not attendance_sheet:
                raise Exception(
                    "Attendance Sheet with id {} not found".format(attendance_id)
                )

            # update these fields on put request
            if "cpw" in updated_data:
                attendance_sheet.cpw = updated_data["cpw"]
            if "csw" in updated_data:
                attendance_sheet.csw = updated_data["csw"]
            if "fcc" in updated_data:
                attendance_sheet.fcc = updated_data["fcc"]

            db.session.commit()
            return AttendanceSheetDTO(**attendance_sheet.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error

    def get_children_by_sheet(self, id):
        try:
            attendance_sheet = AttendanceSheets.query.get(id)
            children = [
                ChildDTO(**child.to_dict()) for child in attendance_sheet.children
            ]
            return children
        except Exception as error:
            self.logger.error(str(error))
            raise error
