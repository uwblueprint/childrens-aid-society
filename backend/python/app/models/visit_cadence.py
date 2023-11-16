from . import db
from .base_mixin import BaseMixin

date_enum = db.Enum(
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    name="visit_cadence_date",
)

frequency_enum = db.Enum(
    "Weekly",
    "Biweekly",
    "Monthly",
    name="visit_cadence_frequency",
)
family_member_enum = db.Enum(  # TODO add more family member enums
    "Dad",
    "Mom",
    "Grandma",
    name="visit_cadence_family_member",
)


class VisitCadence(db.Model, BaseMixin):
    __tablename__ = "visit_cadences"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(date_enum, nullable=False)
    time = db.Column(db.String, nullable=False)
    frequency = db.Column(frequency_enum, nullable=False)
    family_member = db.Column(family_member_enum, nullable=True)
    notes = db.Column(db.String, nullable=True)
    intake_id = db.Column(
        db.Integer, db.ForeignKey("intakes.id", ondelete="CASCADE"), nullable=False
    )
    child_id = db.Column(
        db.Integer, db.ForeignKey("children.id", ondelete="CASCADE"), nullable=True
    )
    caregiver_id = db.Column(
        db.Integer, db.ForeignKey("caregivers.id", ondelete="CASCADE"), nullable=False
    )
