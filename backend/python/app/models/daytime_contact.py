from . import db
from .base_mixin import BaseMixin

daytime_contact_type_enum = db.Enum("SCHOOL", "DAYCARE", name="daytime_contacts_type")


class DaytimeContact(db.Model, BaseMixin):
    __tablename__ = "daytime_contacts"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    contact_information = db.Column(db.String, nullable=False)
    dismissal_time = db.Column(db.String, nullable=True)