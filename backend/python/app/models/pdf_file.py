import sqlalchemy.dialects.postgresql as pg

from . import db
from .base_mixin import BaseMixin


class PdfFile(db.Model, BaseMixin):
    __tablename__ = "pdf_file"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    file_name = db.Column(db.String, nullable=False)
    file_data = db.Column(db.String, nullable=False) # should be BYTEA 