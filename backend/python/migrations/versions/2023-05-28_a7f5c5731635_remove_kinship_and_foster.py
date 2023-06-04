"""remove kinship and foster

Revision ID: a7f5c5731635
Revises: 58c30491ece7
Create Date: 2023-05-28 16:02:20.061417

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "a7f5c5731635"
down_revision = "58c30491ece7"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("children", "has_foster_placement")
    op.drop_column("children", "has_kinship_provider")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "children",
        sa.Column(
            "has_kinship_provider", sa.BOOLEAN(), autoincrement=False, nullable=True
        ),
    )
    op.add_column(
        "children",
        sa.Column(
            "has_foster_placement", sa.BOOLEAN(), autoincrement=False, nullable=True
        ),
    )
    # ### end Alembic commands ###