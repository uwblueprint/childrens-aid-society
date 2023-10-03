from . import db
from .base_mixin import BaseMixin

# association table (attendance_sheets & child)
attendance_sheets_child = db.Table(
    "attendance_child",
    db.metadata,
    db.Column("attendance_sheets_id", db.ForeignKey("attendance_sheets.id")),
    db.Column("child_id", db.ForeignKey("children.id")),
)

class AttendanceSheets(db.Model, BaseMixin):
    __tablename__ = "attendance_sheets"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # intake_id = db.Column(db.Integer, db.ForeignKey("intakes.id"), nullable=True)
    intake_id = db.Column(
        db.Integer, nullable=True
    )  # TODO: REMOVE THIS AND SWAP BACK TO USING intakes.id foreign key
    family_name = db.Column(db.String, nullable=False)
    csw = db.Column(db.String, nullable=False)
    cpw = db.Column(db.String, nullable=False)
    fcc = db.Column(db.String, nullable=False)
    children = db.relationship(
        "Child", secondary=attendance_sheets_child
    )
