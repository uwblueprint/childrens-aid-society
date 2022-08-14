"""add date columns to goals

Revision ID: ccabdb62cbef
Revises: 8298e2141907
Create Date: 2022-08-14 15:18:03.547810

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "ccabdb62cbef"
down_revision = "8298e2141907"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("goals", sa.Column("end_date", sa.Date(), nullable=True))
    op.add_column("goals", sa.Column("start_date", sa.Date(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("goals", "start_date")
    op.drop_column("goals", "end_date")
    # ### end Alembic commands ###
