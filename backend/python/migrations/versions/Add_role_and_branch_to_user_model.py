"""Add driver role and branch to user model

Revision ID: e7f7ce362f62
Revises: 2d6c26fde419
Create Date: 2022-06-01 01:25:25.210065

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "e7f7ce362f62"
down_revision = "2d6c26fde419"
branch_labels = None
depends_on = None


def upgrade():

    branches_stat = postgresql.ENUM("Algoma", name="branches")
    branches_stat.create(op.get_bind())
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "users", sa.Column("branch", sa.Enum("Algoma", name="branches"), nullable=True)
    )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("users", "branch")
    # ### end Alembic commands ###
    branches_stat = postgresql.ENUM("Algoma", name="branches")
    branches_stat.drop(op.get_bind())
