from sqlalchemy import text

from . import db
from .base_mixin import BaseMixin


class Branch(db.Model, BaseMixin):
    __tablename__ = "branches"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    branch = db.Column(db.String, nullable=False)
    is_default = db.Column(
        db.Boolean, nullable=False, default=False, server_default=text("False")
    )
