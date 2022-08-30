import datetime

from sqlalchemy import text

from . import db
from .base_mixin import BaseMixin

type_enum = db.Enum("SHORT_TERM", "LONG_TERM", name="goals_type")


class Goal(db.Model, BaseMixin):
    __tablename__ = "goals"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(type_enum, nullable=False)
    goal = db.Column(db.String, nullable=False)
    start_date = db.Column(
        db.Date,
        default=datetime.datetime.today(),
        nullable=True,
    )
    end_date = db.Column(
        db.Date,
        default=datetime.datetime.today(),
        nullable=True,
    )
    is_default = db.Column(
        db.Boolean, nullable=False, default=False, server_default=text("False")
    )
