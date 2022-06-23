from . import db
from .base_mixin import BaseMixin


class TransportationMethod(db.Model, BaseMixin):
    __tablename__ = "transportation_methods"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    transportation_method = db.Column(db.String, nullable=False)
