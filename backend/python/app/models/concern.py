from . import db
from .base_mixin import BaseMixin

type_enum = db.Enum("FAMILIAL_CONCERN", "CHILD_BEHAVIOR", name="concerns_type")

class Concern(db.Model, BaseMixin):
    __tablename__ = "concerns"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(type_enum)
    concern = db.Column(db.String, nullable=False)
    test = db.Column(type_enum)