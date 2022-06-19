from sqlalchemy import inspect
from sqlalchemy.orm.properties import ColumnProperty

from . import db

type_enum = db.Enum("SCHOOL", "DAYCARE", name="daytime_contacts_type")


class DaytimeContact(db.Model):
    __tablename__ = "daytime_contacts"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    contact_first_name = db.Column(db.String, nullable=False)
    contact_last_name = db.Column(db.String, nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)
    address = db.relationship("Address")
    phone_number = db.Column(db.String, nullable=False)
    type = db.Column(type_enum)

    def to_dict(self, include_relationships=False):
        cls = type(self)

        mapper = inspect(cls)
        formatted = {}
        for column in mapper.attrs:
            field = column.key
            attr = getattr(self, field)
            if isinstance(column, ColumnProperty):
                formatted[field] = attr
            elif include_relationships:
                formatted[field] = [obj.to_dict() for obj in attr]
        return formatted
