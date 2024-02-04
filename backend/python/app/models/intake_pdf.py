from sqlalchemy.dialects.postgresql import BYTEA
from . import db
from .base_mixin import BaseMixin

class PdfFile(db.Model, BaseMixin):
    __tablename__ = "pdf_files"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    file_data = db.Column(BYTEA, nullable=False)

    user = db.relationship("User", foreign_keys=[user_id])
