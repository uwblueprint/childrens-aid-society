"""merging two heads

Revision ID: bb9a626890bb
Revises: 4df756383780, 7cec03c12282
Create Date: 2023-12-07 02:40:06.046968

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "bb9a626890bb"
down_revision = ("4df756383780", "7cec03c12282")
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
