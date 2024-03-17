from ...models import db
from ..interfaces.visit_service import IVisitService
from ...resources.visit_dto import VisitDTO
from ...models.attendance_sheets import AttendanceSheets
from ...models.attendance_records import AttendanceRecords
from ...models.transportation_method import TransportationMethod


class VisitService(IVisitService):
    def __init__(self, logger):
        self.logger = logger

    def create_visit(self, visit: VisitDTO):
        print(visit.__dict__, "visit")
        try:
            attendance_sheet = AttendanceSheets(
                family_name=visit.childInformation["family_name"],
                csw=visit.childInformation["child_service_worker"],
                cpw=visit.childInformation["child_protection_worker"],
                fcc=visit.childInformation["foster_care_coordinator"],
            )
            db.session.add(attendance_sheet)
            db.session.flush()

            attendance_record = AttendanceRecords(
                attendance_sheet_id=attendance_sheet.id,
                visit_date=visit.visitTimestamp,
                visit_day="visit_day_placeholder",
                visit_supervision="PARTIAL",
                start_time="start_time_placeholder",
                end_time="end_time_placeholder",
                location=visit.notes,
                notes=visit.notes,
            )
            db.session.add(attendance_record)

            # TODO: Add a reference key to transportation method for the visit
            transportation_entry = visit.transportation["entries"][0]
            transportation_method_name = transportation_entry["name"]
            attendance_record.notes += (
                f" Transportation Method: {transportation_method_name}"
            )

            db.session.commit()

            return {"message": "Visit created successfully"}
        except Exception as error:
            db.session.rollback()
            self.logger.error(f"Error creating visit: {error}")
            raise error
