from sqlalchemy import inspect
from sqlalchemy.orm.properties import ColumnProperty

from . import db


class Address(db.Model):
    __tablename__ = "addresses"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    street_address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    postal_code = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Numeric(8, 6), nullable=True)
    longitude = db.Column(db.Numeric(9, 6), nullable=True)

    def to_dict(self, include_relationships=False):
        # define the address table
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
