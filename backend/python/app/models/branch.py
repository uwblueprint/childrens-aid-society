from . import db
from .base_mixin import BaseMixin


class Branch(db.Model, BaseMixin):
    __tablename__ = "branches"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    branch = db.Column(db.String, nullable=False)
