from . import db
from .base_mixin import BaseMixin


class Child(db.Model, BaseMixin):
    __tablename__ = "children"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    intake_id = db.Column(db.Integer, db.ForeignKey("intakes.id"), nullable=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    date_of_birth = db.Column(db.Date, nullable=True)
    cpin_number = db.Column(db.String, nullable=True)
    child_service_worker_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )
    daytime_contact_id = db.Column(
        db.Integer, db.ForeignKey("daytime_contacts.id"), nullable=False
    )
    special_needs = db.Column(db.String, nullable=False)
    # has_kinship_provider and has_foster_placement should be mutually exclusive
    has_kinship_provider = db.Column(db.Boolean, nullable=False)
    has_foster_placement = db.Column(db.Boolean, nullable=False)
    intake = db.relationship("Intake")
    child_service_worker = db.relationship("User")
    daytime_contact = db.relationship("DaytimeContact")
