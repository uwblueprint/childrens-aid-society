from . import db
from .base_mixin import BaseMixin


class OtherPermittedIndividual(db.Model, BaseMixin):
    __tablename__ = "other_permitted_individuals"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    relationship_to_child = db.Column(db.String, nullable=False)
    notes = db.Column(db.String, nullable=False)
    intake_id = db.Column(
        db.Integer, db.ForeignKey("intakes.id", ondelete="CASCADE"), nullable=False
    )
