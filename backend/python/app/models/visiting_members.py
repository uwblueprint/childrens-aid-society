from . import db
from .base_mixin import BaseMixin


class VisitingMember(db.Model, BaseMixin):
    __tablename__ = "visiting_members"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    location = db.Column(db.String, nullable=False)
