import sqlalchemy.dialects.postgresql as pg

from . import db
from .base_mixin import BaseMixin

court_status_enum = db.Enum(
    "INTERIM_CARE",
    "FINAL_ORDER_FOR_SOCIETY_CARE",
    "EXTENDED_SOCIETY_CARE",
    "SUPERVISION_ORDER",
    "KIN_SERVICE_PLACEMENT",
    "LIVING_WITH_BIO_FAMILY",
    "OTHER",
    name="intakes_court_status",
)

first_nation_heritage_enum = db.Enum(
    "FIRST_NATION_REGISTERED",
    "ELIGIBLE_FOR_REGISTRATION",
    "INUIT",
    "METIS",
    "UNKNOWN",
    name="intake_first_nation_heritage",
)

intakes_access_weekday_enum = db.Enum(
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
    name="intakes_access_weekday",
)

intakes_concerns = db.Table(
    "intakes_concerns",
    db.metadata,
    db.Column("intake_id", db.ForeignKey("intakes.id")),
    db.Column("concern_id", db.ForeignKey("concerns.id")),
)

intakes_goals = db.Table(
    "intakes_goals",
    db.metadata,
    db.Column("intake_id", db.ForeignKey("intakes.id")),
    db.Column("goal_id", db.ForeignKey("goals.id")),
    db.Column("start_date", db.DateTime),
    db.Column("end_date", db.DateTime),
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
    is_investigation = db.Column(db.Boolean, nullable=True)
    is_ongoing = db.Column(db.Boolean, nullable=True)
    is_court_involved = db.Column(db.Boolean, nullable=True)
    court_status = db.Column(court_status_enum, nullable=True)
    court_order = db.Column(db.String, nullable=True)
    court_order_file = db.Column(db.String, nullable=True)
    is_first_nation_heritage = db.Column(db.Boolean, nullable=True)
    first_nation_heritage = db.Column(first_nation_heritage_enum, nullable=True)
    first_nation_band = db.Column(db.String, nullable=True)
    family_strengths = db.Column(db.String, nullable=True)
    access_type = db.Column(db.String, nullable=True)
    transportation = db.Column(db.String, nullable=True)
    limitations = db.Column(db.String, nullable=True)
    case_date = db.Column(db.Date, nullable=True)
    is_accepted = db.Column(db.Boolean, nullable=True)
    date_accepted = db.Column(db.Date, nullable=True)
    access_start_date = db.Column(db.Date, nullable=True)
    access_weekday = db.Column(pg.ARRAY(intakes_access_weekday_enum), nullable=True)
    access_location_id = db.Column(
        db.Integer, db.ForeignKey("addresses.id"), nullable=True
    )
    access_time = db.Column(db.Time, nullable=True)
    lead_access_worker_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=True
    )
    denial_reason = db.Column(db.String, nullable=True)
    access_location = db.relationship("Address")
    referring_worker = db.relationship("User", foreign_keys=[referring_worker_id])
    lead_access_worker = db.relationship("User", foreign_keys=[lead_access_worker_id])
    concerns = db.relationship("Concern", secondary=intakes_concerns)
    goals = db.relationship("Goal", secondary=intakes_goals)
