"""update intake model

Revision ID: 12e97fac48b2
Revises: 5fff1dc51c07
Create Date: 2022-11-07 00:37:45.389536

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "12e97fac48b2"
down_revision = "5fff1dc51c07"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    # https://stackoverflow.com/questions/37848815/sqlalchemy-postgresql-enum-does-not-create-type-on-db-migrate
    cpin_file_type = postgresql.ENUM("INVESTIGATION", "ONGOING", name="cpin_file_type")
    cpin_file_type.create(op.get_bind())
    op.add_column(
        "intakes",
        sa.Column(
            "cpin_file_type",
            cpin_file_type,
            nullable=False,
        ),
    )

    # https://stackoverflow.com/questions/37848815/sqlalchemy-postgresql-enum-does-not-create-type-on-db-migrate
    intake_status = postgresql.ENUM(
        "SUBMITTED", "PENDING", "ACTIVE", "ARCHIVED", name="intake_status"
    )
    intake_status.create(op.get_bind())
    op.add_column(
        "intakes",
        sa.Column(
            "intake_status",
            intake_status,
            nullable=True,
        ),
    )

    op.add_column(
        "intakes", sa.Column("referring_worker_contact", sa.String(), nullable=False)
    )
    op.add_column(
        "intakes", sa.Column("referring_worker_name", sa.String(), nullable=False)
    )
    op.add_column(
        "intakes", sa.Column("scheduling_requirements", sa.String(), nullable=False)
    )
    op.add_column(
        "intakes", sa.Column("suggested_start_date", sa.Date(), nullable=False)
    )
    op.add_column(
        "intakes", sa.Column("transportation_requirements", sa.String(), nullable=False)
    )
    op.add_column("intakes", sa.Column("user_id", sa.Integer(), nullable=False))
    op.alter_column(
        "intakes", "court_order_file", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column(
        "intakes",
        "court_status",
        existing_type=postgresql.ENUM(
            "INTERIM_CARE",
            "FINAL_ORDER_FOR_SOCIETY_CARE",
            "EXTENDED_SOCIETY_CARE",
            "SUPERVISION_ORDER",
            "KIN_SERVICE_PLACEMENT",
            "LIVING_WITH_BIO_FAMILY",
            "OTHER",
            name="intakes_court_status",
        ),
        nullable=False,
    )
    op.alter_column(
        "intakes", "cpin_number", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column(
        "intakes", "family_name", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column("intakes", "referral_date", existing_type=sa.DATE(), nullable=False)
    op.drop_constraint(
        "intakes_referring_worker_id_fkey", "intakes", type_="foreignkey"
    )
    op.create_foreign_key(None, "intakes", "users", ["user_id"], ["id"])
    op.drop_column("intakes", "is_investigation")
    op.drop_column("intakes", "case_date")
    op.drop_column("intakes", "is_ongoing")
    op.drop_column("intakes", "court_order")
    op.drop_column("intakes", "is_court_involved")
    op.drop_column("intakes", "is_accepted")
    op.drop_column("intakes", "is_first_nation_heritage")
    op.drop_column("intakes", "access_type")
    op.drop_column("intakes", "access_start_date")
    op.drop_column("intakes", "referring_worker_id")
    op.drop_column("intakes", "family_strengths")
    op.drop_column("intakes", "transportation")
    op.drop_column("intakes", "limitations")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "intakes",
        sa.Column("limitations", sa.VARCHAR(), autoincrement=False, nullable=True),
    )
    op.add_column(
        "intakes",
        sa.Column("transportation", sa.VARCHAR(), autoincrement=False, nullable=True),
    )
    op.add_column(
        "intakes",
        sa.Column("family_strengths", sa.VARCHAR(), autoincrement=False, nullable=True),
    )
    op.add_column(
        "intakes",
        sa.Column(
            "referring_worker_id", sa.INTEGER(), autoincrement=False, nullable=True
        ),
    )
    op.add_column(
        "intakes",
        sa.Column("access_start_date", sa.DATE(), autoincrement=False, nullable=True),
    )
    op.add_column(
        "intakes",
        sa.Column("access_type", sa.VARCHAR(), autoincrement=False, nullable=True),
    )
    op.add_column(
        "intakes",
        sa.Column(
            "is_first_nation_heritage", sa.BOOLEAN(), autoincrement=False, nullable=True
        ),
    )
    op.add_column(
        "intakes",
        sa.Column("is_accepted", sa.BOOLEAN(), autoincrement=False, nullable=True),
    )
    op.add_column(
        "intakes",
        sa.Column(
            "is_court_involved", sa.BOOLEAN(), autoincrement=False, nullable=True
        ),
    )
    op.add_column(
        "intakes",
        sa.Column("court_order", sa.VARCHAR(), autoincrement=False, nullable=True),
    )
    op.add_column(
        "intakes",
        sa.Column("is_ongoing", sa.BOOLEAN(), autoincrement=False, nullable=True),
    )
    op.add_column(
        "intakes", sa.Column("case_date", sa.DATE(), autoincrement=False, nullable=True)
    )
    op.add_column(
        "intakes",
        sa.Column("is_investigation", sa.BOOLEAN(), autoincrement=False, nullable=True),
    )
    op.drop_constraint(None, "intakes", type_="foreignkey")
    op.create_foreign_key(
        "intakes_referring_worker_id_fkey",
        "intakes",
        "users",
        ["referring_worker_id"],
        ["id"],
    )
    op.alter_column("intakes", "referral_date", existing_type=sa.DATE(), nullable=True)
    op.alter_column("intakes", "family_name", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column("intakes", "cpin_number", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column(
        "intakes",
        "court_status",
        existing_type=postgresql.ENUM(
            "INTERIM_CARE",
            "FINAL_ORDER_FOR_SOCIETY_CARE",
            "EXTENDED_SOCIETY_CARE",
            "SUPERVISION_ORDER",
            "KIN_SERVICE_PLACEMENT",
            "LIVING_WITH_BIO_FAMILY",
            "OTHER",
            name="intakes_court_status",
        ),
        nullable=True,
    )
    op.alter_column(
        "intakes", "court_order_file", existing_type=sa.VARCHAR(), nullable=True
    )
    op.drop_column("intakes", "user_id")
    op.drop_column("intakes", "transportation_requirements")
    op.drop_column("intakes", "suggested_start_date")
    op.drop_column("intakes", "scheduling_requirements")
    op.drop_column("intakes", "referring_worker_name")
    op.drop_column("intakes", "referring_worker_contact")
    op.drop_column("intakes", "intake_status")
    op.drop_column("intakes", "cpin_file_type")
    # ### end Alembic commands ###
