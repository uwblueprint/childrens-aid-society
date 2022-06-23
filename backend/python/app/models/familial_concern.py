from . import db
from .base_mixin import BaseMixin


class FamilialConcern(db.Model, BaseMixin):
    __tablename__ = "familial_concerns"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    concern = db.Column(db.String, nullable=False)
