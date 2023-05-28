from . import db
from .base_mixin import BaseMixin
from .children_child_behaviors import children_child_behaviors


class Child(db.Model, BaseMixin):
    __tablename__ = "children"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    intake_id = db.Column(db.Integer, db.ForeignKey("intakes.id"), nullable=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    date_of_birth = db.Column(db.String, nullable=True)
    cpin_number = db.Column(db.String, nullable=True)
    service_worker = db.Column(db.String, nullable=False)
    daytime_contact_id = db.Column(
        db.Integer, db.ForeignKey("daytime_contacts.id"), nullable=False
    )
    special_needs = db.Column(db.String, nullable=False)
    intake = db.relationship("Intake")
    daytime_contact = db.relationship("DaytimeContact")
    behaviors = db.relationship("ChildBehavior", secondary=children_child_behaviors)
