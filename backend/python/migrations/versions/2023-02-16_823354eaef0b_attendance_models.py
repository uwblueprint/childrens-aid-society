"""attendance models

Revision ID: 823354eaef0b
Revises: a46d44436397
Create Date: 2023-02-16 01:54:56.208611

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "823354eaef0b"
down_revision = "a46d44436397"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "attendance_records",
        sa.Column("attendance_sheet_id", sa.Integer(), nullable=False),
    )
    op.alter_column(
        "attendance_records",
        "attending_parent",
        existing_type=postgresql.ENUM("MOM", "DAD", name="attending_parent"),
        nullable=False,
    )
    op.alter_column(
        "attendance_records", "comments", existing_type=sa.VARCHAR(), nullable=True
    )
    op.drop_constraint(
        "attendance_records_attendace_sheet_id_fkey",
        "attendance_records",
        type_="foreignkey",
    )
    op.create_foreign_key(
        None, "attendance_records", "attendance_sheets", ["attendance_sheet_id"], ["id"]
    )
    op.drop_column("attendance_records", "attendace_sheet_id")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "attendance_records",
        sa.Column(
            "attendace_sheet_id", sa.INTEGER(), autoincrement=False, nullable=False
        ),
    )
    op.drop_constraint(None, "attendance_records", type_="foreignkey")
    op.create_foreign_key(
        "attendance_records_attendace_sheet_id_fkey",
        "attendance_records",
        "attendance_sheets",
        ["attendace_sheet_id"],
        ["id"],
    )
    op.alter_column(
        "attendance_records", "comments", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column(
        "attendance_records",
        "attending_parent",
        existing_type=postgresql.ENUM("MOM", "DAD", name="attending_parent"),
        nullable=True,
    )
    op.drop_column("attendance_records", "attendance_sheet_id")
    # ### end Alembic commands ###
