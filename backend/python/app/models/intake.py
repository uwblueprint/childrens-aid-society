from . import db
from .base_mixin import BaseMixin

court_status_enum = db.Enum("APPROVE", name="intakes_court_status")
intakes_access_weekday_enum = db.Enum(
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
    name="intakes_access_weekday_enum",
)


class Intake(db.Model, BaseMixin):
    __tablename__ = "intakes"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    referring_worker_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=True
    )
    referral_date = db.Column(db.Date, nullable=True)
    family_name = db.Column(db.String, nullable=True)
    cpin_number = db.Column(db.String, nullable=True)
    is_investigation = db.Column(db.Boolean, nullable=False)
    is_ongoing = db.Column(db.Boolean, nullable=False)
    is_court_involved = db.Column(db.Boolean, nullable=False)
    court_status: db.Column(court_status_enum)
    court_order = db.Column(db.String, nullable=False)
    court_order_file = db.Column(db.String, nullable=False)
    is_first_nation_heritage = db.Column(db.Boolean, nullable=False)
    first_nation_band = db.Column(db.String, nullable=False)
    family_strengths = db.Column(db.String, nullable=False)
    access_type = db.Column(db.String, nullable=False)
    transportation = db.Column(db.String, nullable=False)
    limitations = db.Column(db.String, nullable=False)
    case_date = db.Column(db.Date, nullable=True)
    is_accepted = db.Column(db.Boolean, nullable=False)
    date_accepted = db.Column(db.Date, nullable=False)
    access_start_date = db.Column(db.Date, nullable=False)
    access_weekday = db.Column(
        db.ArrayOfEnum(intakes_access_weekday_enum), nullable=False
    )
    access_location_id = db.Column(
        db.Integer, db.ForeignKey("addresses.id"), nullable=False
    )
    access_time = db.Column(db.Time, nullable=False)
    lead_access_worker_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )
    denial_reason = db.Column(db.String, nullable=False)
    access_location = db.relationship("User")
    lead_access_worker = db.relationship("User")
    access_location = db.relationship("Address")
