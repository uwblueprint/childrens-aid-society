"""get rid of intake id column in goals

Revision ID: 4efb829c774a
Revises: 79a4641aa0e2
Create Date: 2023-10-03 23:59:41.201736

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "4efb829c774a"
down_revision = "79a4641aa0e2"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("goals_intake_id_fkey", "goals", type_="foreignkey")
    op.drop_column("goals", "intake_id")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "goals",
        sa.Column("intake_id", sa.INTEGER(), autoincrement=False, nullable=True),
    )
    op.create_foreign_key(
        "goals_intake_id_fkey", "goals", "intakes", ["intake_id"], ["id"]
    )
    # ### end Alembic commands ###
