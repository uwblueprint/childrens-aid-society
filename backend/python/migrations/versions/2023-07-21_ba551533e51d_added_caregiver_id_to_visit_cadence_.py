"""added caregiver_id to visit_cadence model

Revision ID: ba551533e51d
Revises: 900a2298b0d2
Create Date: 2023-07-21 02:22:01.341912

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "ba551533e51d"
down_revision = "900a2298b0d2"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "visit_cadences", sa.Column("caregiver_id", sa.Integer(), nullable=True)
    )
    op.create_foreign_key(
        None,
        "visit_cadences",
        "caregivers",
        ["caregiver_id"],
        ["id"],
        ondelete="CASCADE",
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "visit_cadences", type_="foreignkey")
    op.drop_column("visit_cadences", "caregiver_id")
    # ### end Alembic commands ###
