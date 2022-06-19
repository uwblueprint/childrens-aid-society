from sqlalchemy import inspect
from sqlalchemy.orm.properties import ColumnProperty

from . import db

type_enum = db.Enum("CAREGIVER", "PROVIDER", name="caregivers_type")
relationship_to_child_enum = db.Enum(
    "MOM",
    "DAD",
    "FOSTER_MOM",
    "FOSTER_DAD",
    "GRANDPARENT",
    name="caregivers_relationship_to_child",
)


class Caregivers(db.Model):
    __tablename__ = "caregivers"
    # TODO: add foreign key reference to child
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(type_enum)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    is_primary = db.Column(db.Boolean, nullable=False, default=True)
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=True)
    relationship_to_child = db.Column(relationship_to_child_enum, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    cpin_number = db.Column(db.String, nullable=True)
    date_of_birth = db.Column(db.Date, nullable=True)
    special_needs = db.Column(db.String, nullable=True)
    name_of_child = db.Column(db.String, nullable=True)
    kinship_worker_name = db.Column(db.String, nullable=True)
    kinship_worker_ext = db.Column(db.String, nullable=True)
    foster_care_coord_name = db.Column(db.String, nullable=True)
    foster_care_coord_ext = db.Column(db.String, nullable=True)
    limitations_for_access = db.Column(db.String, nullable=True)
    address = db.relationship("Address")

    def to_dict(self, include_relationships=False):
        cls = type(self)

        mapper = inspect(cls)
        formatted = {}
        for column in mapper.attrs:
            field = column.key
            attr = getattr(self, field)
            if isinstance(column, ColumnProperty):
                formatted[field] = attr
            elif include_relationships:
                formatted[field] = [obj.to_dict() for obj in attr]
        return formatted
