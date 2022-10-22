from . import db
from .base_mixin import BaseMixin

caregiver_type_enum = db.Enum("CAREGIVER", "PROVIDER", name="caregivers_type")
relationship_to_child_enum = db.Enum(
    "FOSTER_CAREGIVER",
    "KINSHIP_CAREGIVER",
    "BIOLOGICAL_FAMILY",
    name="caregivers_relationship_to_child",
)


class Caregiver(db.Model, BaseMixin):
    __tablename__ = "caregivers"

    # TODO: add foreign key reference to child
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(caregiver_type_enum, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    date_of_birth = db.Column(db.Date, nullable=True)
    special_needs = db.Column(db.String, nullable=True)
    file_number = db.Column(db.String, nullable=False)
    primary_phone = db.Column(db.String, nullable=False)
    secondary_phone = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)
    address = db.relationship("Address", backref="caregivers")
    relationship_to_child = db.Column(relationship_to_child_enum, nullable=False)
    preferred_contact_method = db.Column(db.String, nullable=True)
    intake_id = db.Column(db.Integer, db.ForeignKey("intakes.id"), nullable=False)
    intake = db.relationship("Intake", backref="caregivers")
