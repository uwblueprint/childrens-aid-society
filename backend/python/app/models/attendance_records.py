from . import db
from .base_mixin import BaseMixin
from sqlalchemy import *
from sqlalchemy.dialects.postgresql import ARRAY

supervision_enum = db.Enum("FULL", "PARTIAL", "UNSUPERVISED", name="supervision")

attendance_enum = db.Enum("PRESENT", "CANCELLED", "NO_SHOW", name="visitAttendance")

attending_family_enum = db.Enum("MOM", "DAD", name="visitorRelationship")


class AttendanceRecords(db.Model, BaseMixin):
    __tablename__ = "attendance_records"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    attendance_sheet_id = db.Column(db.Integer, db.ForeignKey("attendance_sheets.id"), nullable=False)

    visitDate = db.Column(db.String, nullable=False)
    visitDay = db.Column(db.String, nullable=False)
    visitSupervision = db.Column(supervision_enum, nullable=False)
    startTime = db.Column(db.String, nullable=False)
    endTime = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)

    meta = MetaData()
    visitingMembers = Table('visiting_members', meta,
        Column('id', Integer, primary_key=True, nullable=False),
        Column('attendance_record_id', Integer, ForeignKey("attendance_records.id"), nullable=False),
        Column('visitor_relationship', attending_family_enum, nullable=False),
        Column('description', String, nullable=False),
        Column('visiting_member_name', String, nullable=False),
        Column('visit_attendance', attendance_enum, nullable=False),
        Column('reason_for_absence', String, nullable=True)
    )

    transportation = Table('transportation', meta,
        Column('id', Integer, primary_key=True, nullable=False),
        Column('attendance_record_id', Integer, ForeignKey("attendance_records.id"), nullable=False),
        Column('guardian', String, nullable=False),
        Column('name', String, nullable=False),
        Column('duration', Integer, nullable=False)
    )

    staff_transport_time_min = db.Column(db.Integer, nullable=True)
    driver_transport_time_min = db.Column(db.Integer, nullable=True)
    foster_parent_transport_time_min = db.Column(db.Integer, nullable=True)

    notes = db.Column(db.String, nullable=True)
    child_family_support_worker_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    
    user = db.relationship("User")

# # class VisitingMember(db.Model):
# #     __tablename__ = "visiting_members"

# #     id = db.Column(db.Integer, primary_key=True, nullable=False)
# #     attendance_record_id = db.Column(db.Integer, db.ForeignKey("attendance_records.id"), nullable=False)

# #     visitorRelationship = db.Column(attending_family_enum, nullable=False)
# #     description = db.Column(db.String, nullable=False)
# #     visitingMemberName = db.Column(db.String, nullable=False)
# #     visitAttendance = db.Column(attendance_enum, nullable=False)
# #     reasonForAbsence = db.Column(db.String, nullable=True)

# # class Transportation(db.Model):
# #     __tablename__ = "transportation"

# #     id = db.Column(db.Integer, primary_key=True, nullable=False)
# #     attendence_record_id = db.Column(db.Integer, db.ForeignKey("attendance_records.id"), nullable=False)
    
# #     guardian = db.Column(db.String, nullable=False)
# #     name = db.Column(db.String, nullable=False)
# #     duration = db.Column(db.Integer, nullable=False)
