from ...models import db
from ..interfaces.visit_service import IVisitService
from ...resources.visit_dto import VisitDTO
from ...resources.attendance_sheet_dto import AttendanceSheetDTO
from ...resources.attendance_records_dto import AttendanceRecordsDTO
from ...models.attendance_sheets import AttendanceSheets
from ...models.attendance_records import AttendanceRecords
from ...models.transportation_method import TransportationMethod


class VisitService(IVisitService):
    def __init__(self, logger):
        self.logger = logger

    def create_visit(self, visit: VisitDTO):
        try:
            attendance_sheet = AttendanceSheets(
                family_name=visit.child_details["family_name"],
                csw=visit.child_details["child_service_worker"],
                cpw=visit.child_details["child_protection_worker"],
                fcc=visit.child_details["foster_care_coordinator"],
            )
            db.session.add(attendance_sheet)
            db.session.flush()

            attendance_record = AttendanceRecords(
                attendance_sheet_id=attendance_sheet.id,
                visit_date=visit.visit_details["visit_date"],
                visit_day=visit.visit_details["visit_day"],
                visit_supervision=visit.visit_details["visit_supervision"].upper(),
                start_time=visit.visit_details["start_time"],
                end_time=visit.visit_details["end_time"],
                location=visit.visit_details["location"],
                notes=visit.notes,
            )
            db.session.add(attendance_record)

            # TODO: Add a reference key to transportation method for the visit
            # transportation_entry = visit.transportation["entries"][0]
            # transportation_method_name = transportation_entry["name"]
            # attendance_record.notes += (
            #     f" Transportation Method: {transportation_method_name}"
            # )

            db.session.commit()

            return {"message": "Visit created successfully"}
        except Exception as error:
            db.session.rollback()
            self.logger.error(f"Error creating visit: {error}")
            raise error

    def get_visit_by_user_id(self, userID):
        try:
            attendance_sheets = AttendanceSheets.query.filter_by(id=userID)
            attendance_sheets_dto = [
                AttendanceSheetDTO(**attendance_sheet.to_dict())
                for attendance_sheet in attendance_sheets
            ]

            attendance_records = AttendanceRecords.query.filter_by(
                attendance_sheet_id=userID
            )
            attendance_records_dto = [
                AttendanceRecordsDTO(**attendance_record.to_dict())
                for attendance_record in attendance_records
            ]

            return attendance_sheets_dto + attendance_records_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error
