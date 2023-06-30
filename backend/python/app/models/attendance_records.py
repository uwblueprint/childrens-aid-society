from . import db
from .base_mixin import BaseMixin

supervision_enum = db.Enum("FULL", "PARTIAL", "UNSUPERVISED", name="supervision")

attendance_enum = db.Enum("PRESENT", "CANCELLED", "NO_SHOW", name="attendance")

attending_family_enum = db.Enum("MOM", "DAD", name="attending_family")


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
    location = db.Column(db.String, nullable=False)
    attendance = db.Column(attendance_enum, nullable=False)
    attending_family = db.Column(attending_family_enum, nullable=False)
    staff_transport_time_min = db.Column(db.Integer, nullable=True)
    driver_transport_time_min = db.Column(db.Integer, nullable=True)
    foster_parent_transport_time_min = db.Column(db.Integer, nullable=True)
    child_family_support_worker_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=True
    )
    comments = db.Column(db.String, nullable=True)
    user = db.relationship("User")
