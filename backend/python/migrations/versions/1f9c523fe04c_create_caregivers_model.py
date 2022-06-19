"""Create caregivers model

Revision ID: 1f9c523fe04c
Revises: 8ad687618714
Create Date: 2022-06-12 16:35:45.886412

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "1f9c523fe04c"
down_revision = "8ad687618714"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "caregivers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "type",
            sa.Enum("CAREGIVER", "PROVIDER", name="caregivers_type"),
            nullable=True,
        ),
        sa.Column("first_name", sa.String(), nullable=False),
        sa.Column("last_name", sa.String(), nullable=False),
        sa.Column("is_primary", sa.Boolean(), default=True),
        sa.Column("address_id", sa.Integer(), nullable=True),
        sa.Column(
            "relationship_to_child",
            sa.Enum(
                "MOM",
                "DAD",
                "FOSTER_MOM",
                "FOSTER_DAD",
                "GRANDPARENT",
                name="caregivers_relationship_to_child",
            ),
            nullable=False,
        ),
        sa.Column("phone_number", sa.String(), nullable=False),
        sa.Column("cpin_number", sa.String(), nullable=True),
        sa.Column("date_of_birth", sa.Date(), nullable=True),
        sa.Column("special_needs", sa.String(), nullable=True),
        sa.Column("name_of_child", sa.String(), nullable=True),
        sa.Column("kinship_worker_name", sa.String(), nullable=True),
        sa.Column("kinship_worker_ext", sa.String(), nullable=True),
        sa.Column("foster_care_coord_name", sa.String(), nullable=True),
        sa.Column("foster_care_coord_ext", sa.String(), nullable=True),
        sa.Column("limitations_for_access", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["address_id"],
            ["addresses.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("caregivers")
    op.execute("DROP TYPE caregivers_type;")
    op.execute("DROP TYPE caregivers_relationship_to_child;")
    # ### end Alembic commands ###