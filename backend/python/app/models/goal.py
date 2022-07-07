from . import db
from .base_mixin import BaseMixin

type_enum = db.Enum("SHORT_TERM", "LONG_TERM", name="goals_type")


class Goal(db.Model, BaseMixin):
    __tablename__ = "goals"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(type_enum)
    goal = db.Column(db.String, nullable=False)
