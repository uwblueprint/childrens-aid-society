from . import db
from .base_mixin import BaseMixin


class ChildConcern(db.Model, BaseMixin):
    __tablename__ = "child_concerns"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    concern = db.Column(db.String, nullable=False)
