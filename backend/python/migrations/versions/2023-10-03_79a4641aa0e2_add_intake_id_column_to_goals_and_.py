"""add intake id column to goals and daytime contact

Revision ID: 79a4641aa0e2
Revises: 73b155c137af
Create Date: 2023-10-03 23:49:32.368445

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "79a4641aa0e2"
down_revision = "73b155c137af"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "daytime_contacts", sa.Column("intake_id", sa.Integer(), nullable=True)
    )
    op.create_foreign_key(None, "daytime_contacts", "intakes", ["intake_id"], ["id"])
    op.add_column("goals", sa.Column("intake_id", sa.Integer(), nullable=True))
    op.create_foreign_key(None, "goals", "intakes", ["intake_id"], ["id"])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "goals", type_="foreignkey")
    op.drop_column("goals", "intake_id")
    op.drop_constraint(None, "daytime_contacts", type_="foreignkey")
    op.drop_column("daytime_contacts", "intake_id")
    # ### end Alembic commands ###
