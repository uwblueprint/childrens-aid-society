"""Change attendance model to snake case

Revision ID: 1a41a10159ef
Revises: 2e3a95429cdf
Create Date: 2023-11-28 02:16:59.806258

"""

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "1a41a10159ef"
down_revision = "2e3a95429cdf"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "transportation",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("attendence_record_id", sa.Integer(), nullable=False),
        sa.Column("guardian", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("duration", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["attendence_record_id"],
            ["attendance_records.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "visiting_members",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("attendance_record_id", sa.Integer(), nullable=False),
        sa.Column(
            "visitor_relationship",
            sa.Enum(
                "FOSTER_CAREGIVER",
                "KINSHIP_CAREGIVER",
                "BIOLOGICAL_FAMILY",
                "ADOPTIVE_PARENT",
                "FOSTER_PARENT",
                "BIOLOGICAL_PARENT",
                "STEP_PARENT",
                "MATERNAL_GRANDPARENT",
                "PATERNAL_GRANDPARENT",
                "SIBLING",
                "STEP_SIBLING",
                "HALF_SIBLING",
                "UNCLE/AUNT",
                "OTHER_RELATIVE",
                "OTHER",
                name="visitorRelationship",
            ),
            nullable=False,
        ),
        sa.Column("description", sa.String(), nullable=False),
        sa.Column("visiting_member_name", sa.String(), nullable=False),
        sa.Column(
            "visit_attendance",
            sa.Enum("PRESENT", "CANCELLED", "NO_SHOW", name="visitAttendance"),
            nullable=False,
        ),
        sa.Column("reason_for_absence", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["attendance_record_id"],
            ["attendance_records.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.add_column(
        "attendance_records", sa.Column("endTime", sa.String(), nullable=False)
    )
    op.add_column("attendance_records", sa.Column("notes", sa.String(), nullable=True))
    op.add_column(
        "attendance_records", sa.Column("startTime", sa.String(), nullable=False)
    )
    op.add_column(
        "attendance_records", sa.Column("visitDate", sa.String(), nullable=False)
    )
    op.add_column(
        "attendance_records", sa.Column("visitDay", sa.String(), nullable=False)
    )
    op.add_column(
        "attendance_records",
        sa.Column(
            "visitSupervision",
            sa.Enum("FULL", "PARTIAL", "UNSUPERVISED", name="supervision"),
            nullable=False,
        ),
    )
    op.drop_column("attendance_records", "attending_family")
    op.drop_column("attendance_records", "attendance")
    op.drop_column("attendance_records", "supervision")
    op.drop_column("attendance_records", "date")
    op.drop_column("attendance_records", "start_time")
    op.drop_column("attendance_records", "end_time")
    op.drop_column("attendance_records", "comments")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "attendance_records",
        sa.Column("comments", sa.VARCHAR(), autoincrement=False, nullable=True),
    )
    op.add_column(
        "attendance_records",
        sa.Column("end_time", sa.VARCHAR(), autoincrement=False, nullable=False),
    )
    op.add_column(
        "attendance_records",
        sa.Column("start_time", sa.VARCHAR(), autoincrement=False, nullable=False),
    )
    op.add_column(
        "attendance_records",
        sa.Column("date", sa.VARCHAR(), autoincrement=False, nullable=False),
    )
    op.add_column(
        "attendance_records",
        sa.Column(
            "supervision",
            postgresql.ENUM("FULL", "PARTIAL", "UNSUPERVISED", name="supervision"),
            autoincrement=False,
            nullable=False,
        ),
    )
    op.add_column(
        "attendance_records",
        sa.Column(
            "attendance",
            postgresql.ENUM("PRESENT", "CANCELLED", "NO_SHOW", name="attendace"),
            autoincrement=False,
            nullable=False,
        ),
    )
    op.add_column(
        "attendance_records",
        sa.Column(
            "attending_family",
            postgresql.ENUM("MOM", "DAD", name="attending_family"),
            autoincrement=False,
            nullable=False,
        ),
    )
    op.drop_column("attendance_records", "visitSupervision")
    op.drop_column("attendance_records", "visitDay")
    op.drop_column("attendance_records", "visitDate")
    op.drop_column("attendance_records", "startTime")
    op.drop_column("attendance_records", "notes")
    op.drop_column("attendance_records", "endTime")
    op.drop_table("visiting_members")
    op.drop_table("transportation")
    # ### end Alembic commands ###
