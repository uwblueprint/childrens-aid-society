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
                family_name=visit.childInformation["familyName"],
                csw=visit.childInformation["childServiceWorker"],
                cpw=visit.childInformation["childProtectionWorker"],
                fcc=visit.childInformation["fosterCareCoordinator"],
            )
            db.session.add(attendance_sheet)
            db.session.flush()

            attendance_record = AttendanceRecords(
                attendance_sheet_id=attendance_sheet.id,
                visit_date=visit.visitDetails["visitDate"],
                visit_day=visit.visitDetails["visitDay"],
                visit_supervision=visit.visitDetails["visitSupervision"],
                start_time=visit.visitDetails["startTime"],
                end_time=visit.visitDetails["endTime"],
                location=visit.visitDetails["location"],
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
                AttendanceSheetDTO(**attendance_sheet.to_dict()) for attendance_sheet in attendance_sheets
            ]

            attendance_records = AttendanceRecords.query.filter_by(attendance_sheet_id=userID)
            attendance_records_dto = [
                AttendanceRecordsDTO(**attendance_record.to_dict()) for attendance_record in attendance_records
            ]

            return attendance_sheets_dto + attendance_records_dto
        except Exception as error:
            self.logger.error(str(error))
            raise error