"""<short description of the migration>

Revision ID: 752ae3a1854f
Revises: 2e3a95429cdf
Create Date: 2023-11-16 03:09:34.009186

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "752ae3a1854f"
down_revision = "2e3a95429cdf"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "visit_cadences",
        "family_member",
        existing_type=postgresql.ENUM(
            "Dad", "Mom", "Grandma", name="visit_cadence_family_member"
        ),
        nullable=True,
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "visit_cadences",
        "family_member",
        existing_type=postgresql.ENUM(
            "Dad", "Mom", "Grandma", name="visit_cadence_family_member"
        ),
        nullable=False,
    )
    # ### end Alembic commands ###
