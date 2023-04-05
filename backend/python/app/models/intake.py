import sqlalchemy.dialects.postgresql as pg

from . import db
from .base_mixin import BaseMixin
from .intakes_concerns import intakes_concerns
from .intakes_goals import intakes_goals

intake_status_enum = db.Enum(
    "IN_PROGRESS",
    "IN_REVIEW",
    "ACCEPTED",
    "DENIED",
    name="intake_status",
)

cpin_file_type_enum = db.Enum(
    "INVESTIGATION",
    "ONGOING",
    name="cpin_file_type",
)

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
    name="intakes_first_nation_heritage",
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


class Intake(db.Model, BaseMixin):
    __tablename__ = "intakes"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    intake_status = db.Column(intake_status_enum, nullable=True, default="IN_PROGRESS")
    referring_worker_name = db.Column(db.String, nullable=False)
    referring_worker_contact = db.Column(db.String, nullable=False)
    referral_date = db.Column(db.String, nullable=False)
    family_name = db.Column(db.String, nullable=False)
    cpin_number = db.Column(db.String, nullable=False)
    cpin_file_type = db.Column(cpin_file_type_enum, nullable=False)
    court_status = db.Column(court_status_enum, nullable=False)
    court_order_file = db.Column(db.String, nullable=False)
    first_nation_heritage = db.Column(first_nation_heritage_enum, nullable=True)
    first_nation_band = db.Column(db.String, nullable=True)
    transportation_requirements = db.Column(db.String, nullable=False)
    scheduling_requirements = db.Column(db.String, nullable=False)
    suggested_start_date = db.Column(db.String, nullable=False)
    date_accepted = db.Column(db.String, nullable=True)
    access_weekday = db.Column(pg.ARRAY(intakes_access_weekday_enum), nullable=True)
    access_location = db.Column(db.String, nullable=True)
    access_time = db.Column(db.Time, nullable=True)
    lead_access_worker_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=True
    )
    denial_reason = db.Column(db.String, nullable=True)
    concerns = db.relationship("FamilialConcern", secondary=intakes_concerns)
    goals = db.relationship("Goal", secondary=intakes_goals)
