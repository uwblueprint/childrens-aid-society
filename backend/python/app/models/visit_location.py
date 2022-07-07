from . import db
from .base_mixin import BaseMixin


class VisitLocation(db.Model, BaseMixin):
    __tablename__ = "visit_locations"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    location = db.Column(db.String, nullable=False)
