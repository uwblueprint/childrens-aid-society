from sqlalchemy import *
from sqlalchemy.dialects.postgresql import ARRAY

from . import db
from .base_mixin import BaseMixin

supervision_enum = db.Enum("FULL", "PARTIAL", "UNSUPERVISED", name="supervision")

attendance_enum = db.Enum("PRESENT", "CANCELLED", "NO_SHOW", name="visitAttendance")

attending_family_enum = db.Enum(
    "FOSTER_CAREGIVER",
    "KINSHIP_CAREGIVER",
    "BIOLOGICAL_FAMILY",
    "ADOPTIVE_PARENT",
    "FOSTER_PARENT",
    "BIOLOGICAL_PARENT",
    "STEP_PARENT",
    "MATERNAL_GRANDPARENT",
    "PATERNAL_GRANDPARENT",
    "SIBLING",
    "STEP_SIBLING",
    "HALF_SIBLING",
    "UNCLE/AUNT",
    "OTHER_RELATIVE",
    "OTHER",
    name="visitorRelationship",
)


class AttendanceRecords(db.Model, BaseMixin):
    __tablename__ = "attendance_records"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    attendance_sheet_id = db.Column(
        db.Integer, db.ForeignKey("attendance_sheets.id"), nullable=False
    )

    visit_date = db.Column(db.String, nullable=False)
    visit_day = db.Column(db.String, nullable=False)
    visit_supervision = db.Column(supervision_enum, nullable=False)
    start_time = db.Column(db.String, nullable=False)
    end_time = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)

    visiting_members = db.relationship(
        "VisitingMember", backref="associated_record", cascade="all, delete"
    )
    transportation = db.relationship(
        "Transportation", backref="associated_record", cascade="all, delete"
    )

    staff_transport_time_min = db.Column(db.Integer, nullable=True)
    driver_transport_time_min = db.Column(db.Integer, nullable=True)
    foster_parent_transport_time_min = db.Column(db.Integer, nullable=True)

    notes = db.Column(db.String, nullable=True)
    child_family_support_worker_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=True
    )

    user = db.relationship("User")


class VisitingMember(db.Model):
    __tablename__ = "visiting_members"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    attendance_record_id = db.Column(
        db.Integer, db.ForeignKey("attendance_records.id"), nullable=False
    )

    visitor_relationship = db.Column(attending_family_enum, nullable=False)
    description = db.Column(db.String, nullable=False)
    visiting_member_name = db.Column(db.String, nullable=False)
    visit_attendance = db.Column(attendance_enum, nullable=False)
    reason_for_absence = db.Column(db.String, nullable=True)


class Transportation(db.Model):
    __tablename__ = "transportation"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    attendance_record_id = db.Column(
        db.Integer, db.ForeignKey("attendance_records.id"), nullable=False
    )

    guardian = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    duration = db.Column(db.Integer, nullable=False)

    # meta = MetaData()
    # visitingMembers = Table('visiting_members', meta,
    #     Column('id', Integer, primary_key=True, nullable=False),
    #     Column('attendance_record_id', Integer, ForeignKey("attendance_records.id"), nullable=False),
    #     Column('visitor_relationship', attending_family_enum, nullable=False),
    #     Column('description', String, nullable=False),
    #     Column('visiting_member_name', String, nullable=False),
    #     Column('visit_attendance', attendance_enum, nullable=False),
    #     Column('reason_for_absence', String, nullable=True)
    # )

    # transportation = Table('transportation', meta,
    #     Column('id', Integer, primary_key=True, nullable=False),
    #     Column('attendance_record_id', Integer, ForeignKey("attendance_records.id"), nullable=False),
    #     Column('guardian', String, nullable=False),
    #     Column('name', String, nullable=False),
    #     Column('duration', Integer, nullable=False)
    # )
