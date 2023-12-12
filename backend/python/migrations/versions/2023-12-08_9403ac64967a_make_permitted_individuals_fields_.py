"""make permitted individuals fields optional

Revision ID: 9403ac64967a
Revises: 85753f37ce63
Create Date: 2023-12-08 17:17:11.029996

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "9403ac64967a"
down_revision = "85753f37ce63"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "children", "service_worker", existing_type=sa.VARCHAR(), nullable=True
    )
    op.alter_column(
        "children", "special_needs", existing_type=sa.VARCHAR(), nullable=True
    )
    op.alter_column(
        "other_permitted_individuals",
        "notes",
        existing_type=sa.VARCHAR(),
        nullable=True,
    )
    op.alter_column(
        "other_permitted_individuals",
        "phone_number",
        existing_type=sa.VARCHAR(),
        nullable=True,
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "other_permitted_individuals",
        "phone_number",
        existing_type=sa.VARCHAR(),
        nullable=False,
    )
    op.alter_column(
        "other_permitted_individuals",
        "notes",
        existing_type=sa.VARCHAR(),
        nullable=False,
    )
    op.alter_column(
        "children", "special_needs", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column(
        "children", "service_worker", existing_type=sa.VARCHAR(), nullable=False
    )
    # ### end Alembic commands ###
