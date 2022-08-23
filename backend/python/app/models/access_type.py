from sqlalchemy import text

from . import db
from .base_mixin import BaseMixin


class AccessType(db.Model, BaseMixin):
    __tablename__ = "access_types"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    access_type = db.Column(db.String, nullable=False)
    is_default = db.Column(
        db.Boolean, nullable=False, default=False, server_default=text("False")
    )
