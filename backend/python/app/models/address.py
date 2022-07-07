from . import db
from .base_mixin import BaseMixin


class Address(db.Model, BaseMixin):
    __tablename__ = "addresses"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    street_address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    postal_code = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Numeric(8, 6), nullable=True)
    longitude = db.Column(db.Numeric(9, 6), nullable=True)
