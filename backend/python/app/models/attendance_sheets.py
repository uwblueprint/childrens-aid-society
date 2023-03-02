from . import db
from .base_mixin import BaseMixin

month_enum = db.Enum(
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
    name="month",
)


class AttendanceSheets(db.Model, BaseMixin):
    __tablename__ = "attendance_sheets"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    intake_id = db.Column(db.Integer, db.ForeignKey("intakes.id"), nullable=True)
    family_name = db.Column(db.String, nullable=False)
    month = db.Column(month_enum, nullable=False)
    csw = db.Column(db.String, nullable=False)
    cpw = db.Column(db.String, nullable=False)
    fcc = db.Column(db.String, nullable=False)
