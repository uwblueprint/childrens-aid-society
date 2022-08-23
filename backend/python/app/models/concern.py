from sqlalchemy import text

from . import db
from .base_mixin import BaseMixin

type_enum = db.Enum("FAMILIAL_CONCERN", "CHILD_BEHAVIOUR", name="concerns_type")


class Concern(db.Model, BaseMixin):
    __tablename__ = "concerns"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(type_enum, nullable=False)
    concern = db.Column(db.String, nullable=False)
    is_default = db.Column(
        db.Boolean, nullable=False, default=False, server_default=text("False")
    )
