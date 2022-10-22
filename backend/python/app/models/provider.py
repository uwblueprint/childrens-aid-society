from . import db
from .base_mixin import BaseMixin

class Provider(db.Model, BaseMixin):
    __tablename__ = "providers"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    file_number = db.Column(db.String, nullable=False)
    primary_phone_number = db.Column(db.String, nullable=False)
    secondary_phone_number = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)
    address = db.relationship("Address", backref="providers")
    relationship_to_child = db.Column(db.String, nullable=False)
    preferred_contact_method = db.Column(db.String, nullable=True)
    child_id = db.Column(db.Integer, db.ForeignKey("children.id"), nullable=False)
