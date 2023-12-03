from . import db
from .base_mixin import BaseMixin

relationship_to_child_enum = db.Enum(
    "FOSTER_CAREGIVER",
    "KINSHIP_CAREGIVER",
    "BIOLOGICAL_FAMILY",
    name="caregivers_relationship_to_child",
)


class Caregiver(db.Model, BaseMixin):
    __tablename__ = "caregivers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    date_of_birth = db.Column(db.String, nullable=False)
    individual_considerations = db.Column(db.String, nullable=True)
    primary_phone_number = db.Column(db.String, nullable=False)
    secondary_phone_number = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=True)
    address = db.Column(db.String, nullable=False)
    relationship_to_child = db.Column(relationship_to_child_enum, nullable=False)
    additional_contact_notes = db.Column(db.String, nullable=True)
    intake_id = db.Column(
        db.Integer, db.ForeignKey("intakes.id", ondelete="CASCADE"), nullable=False
    )
    visit_cadence = db.relationship(
        "VisitCadence", backref="associated_caregiver", cascade="all, delete"
    )
