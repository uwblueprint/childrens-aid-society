from . import db
from .base_mixin import BaseMixin

supervision_enum = db.Enum("FULL", "PARTIAL", "UNSUPERVISED", name="supervision")

attendance_enum = db.Enum("PRESENT", "CANCELLED", "NO_SHOW", name="attendance")

attending_parent_enum = db.Enum("MOM", "DAD", name="attending_parent")


class AttendanceRecords(db.Model, BaseMixin):
    __tablename__ = "attendance_records"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    attendance_sheet_id = db.Column(
        db.Integer, db.ForeignKey("attendance_sheets.id"), nullable=False
    )
    supervision = db.Column(supervision_enum, nullable=False)
    date = db.Column(db.String, nullable=False)
    start_time = db.Column(db.String, nullable=False)
    end_time = db.Column(db.String, nullable=False)
    place = db.Column(db.String, nullable=False)
    attendance = db.Column(attendance_enum, nullable=False)
    attending_parent = db.Column(attending_parent_enum, nullable=False)
    staff_transport_time_min = db.Column(db.Integer, nullable=True)
    driver_transport_time_min = db.Column(db.Integer, nullable=True)
    foster_parent_transport_time_min = db.Column(db.Integer, nullable=True)
    access_worker_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    comments = db.Column(db.String, nullable=True)
