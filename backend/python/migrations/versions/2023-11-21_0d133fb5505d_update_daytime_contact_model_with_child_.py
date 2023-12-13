"""Update Daytime Contact Model with child_id instead of intake_id

Revision ID: 0d133fb5505d
Revises: 2e3a95429cdf
Create Date: 2023-11-21 01:44:17.187340

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "0d133fb5505d"
down_revision = "2e3a95429cdf"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "daytime_contacts", sa.Column("child_id", sa.Integer(), nullable=True)
    )
    op.drop_constraint(
        "daytime_contacts_intake_id_fkey", "daytime_contacts", type_="foreignkey"
    )
    op.create_foreign_key(None, "daytime_contacts", "children", ["child_id"], ["id"])
    op.drop_column("daytime_contacts", "intake_id")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "daytime_contacts",
        sa.Column("intake_id", sa.INTEGER(), autoincrement=False, nullable=True),
    )
    op.drop_constraint(None, "daytime_contacts", type_="foreignkey")
    op.create_foreign_key(
        "daytime_contacts_intake_id_fkey",
        "daytime_contacts",
        "intakes",
        ["intake_id"],
        ["id"],
    )
    op.drop_column("daytime_contacts", "child_id")
    # ### end Alembic commands ###
