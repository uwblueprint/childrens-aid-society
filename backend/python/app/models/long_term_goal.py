from . import db
from .base_mixin import BaseMixin


class LongTermGoal(db.Model, BaseMixin):
    __tablename__ = "long_term_goals"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    goal = db.Column(db.String, nullable=False)
