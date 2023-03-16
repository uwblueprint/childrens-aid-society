"""Change instances of attending_parent to attending_family

Revision ID: e8d276dc89aa
Revises: 784b7a2d1114
Create Date: 2023-03-16 00:59:37.963426

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "e8d276dc89aa"
down_revision = "784b7a2d1114"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "attendance_records",
        sa.Column(
            "attending_family",
            sa.Enum("MOM", "DAD", name="attending_family"),
            nullable=False,
        ),
    )
    op.drop_column("attendance_records", "attending_parent")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "attendance_records",
        sa.Column(
            "attending_parent",
            postgresql.ENUM("MOM", "DAD", name="attending_parent"),
            autoincrement=False,
            nullable=False,
        ),
    )
    op.drop_column("attendance_records", "attending_family")
    # ### end Alembic commands ###
