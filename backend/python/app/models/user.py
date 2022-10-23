from . import db
from .base_mixin import BaseMixin

user_role_enum = db.Enum("User", "Admin", name="users_role")


class User(db.Model, BaseMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    auth_id = db.Column(db.String, nullable=False)
    role = db.Column(user_role_enum)
    branch = db.Column(db.String, nullable=False, default="ALGOMA")
