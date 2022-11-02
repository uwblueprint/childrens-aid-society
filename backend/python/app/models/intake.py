import sqlalchemy.dialects.postgresql as pg

from . import db
from .base_mixin import BaseMixin

intake_status_enum = db.Enum(
    "IN PROGRESS",
    "IN REVIEW",
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

    """
        id [unchanged]
        user_id
        intake_status (enum 'IN PROGRESS', 'IN REVIEW', 'ACCEPTED', 'DENIED'; default 'IN PROGRESS')
        referring_worker_name (string)
        referring_worker_contact (string)
        referral_date [unchanged]
        family_name [unchanged]
        cpin_number [unchanged]
        cpin_file_type (enum 'INVESTIGATION' or 'ONGOING')
    """
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    intake_status = db.Column(intake_status_enum, nullable=True, default="IN PROGRESS")
    referring_worker_name = db.Column(db.String, nullable=False)
    referring_worker_contact = db.Column(db.String, nullable=False)
    referral_date = db.Column(db.Date, nullable=True)
    family_name = db.Column(db.String, nullable=True)
    cpin_number = db.Column(db.String, nullable=True)
    cpin_file_type = db.Column(cpin_file_type_enum, nullable=False)

    """
        court_status [unchanged]
        court_order_file [unchanged]
        first_nation_heritage [unchanged]
        first_nation_band [unchanged]
    """
    court_status = db.Column(court_status_enum, nullable=True)
    court_order_file = db.Column(db.String, nullable=True)
    first_nation_heritage = db.Column(first_nation_heritage_enum, nullable=True)
    first_nation_band = db.Column(db.String, nullable=True)

    """
        transportation_method (string)
        access_type (string)
        access_start_date (date)
    """
    transportation_method = db.Column(db.String, nullable=False)
    access_type = db.Column(db.String, nullable=False)
    access_start_date = db.Column(db.Date, nullable=False)

    """
        date_accepted [unchanged] (nullable)
        access_weekday [unchanged]
        access_location_id [unchanged]
        access_time [unchanged]
        lead_access_worker_id [unchanged] (nullable)
        denial_reason [unchanged] (nullable)
    """
    date_accepted = db.Column(db.Date, nullable=True)
    access_weekday = db.Column(pg.ARRAY(intakes_access_weekday_enum), nullable=True)
    access_location_id = db.Column(
        db.Integer, db.ForeignKey("addresses.id"), nullable=True
    )
    access_time = db.Column(db.Time, nullable=True)
    lead_access_worker_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=True
    )
    denial_reason = db.Column(db.String, nullable=True)
