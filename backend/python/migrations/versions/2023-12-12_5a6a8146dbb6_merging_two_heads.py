"""merging two heads

Revision ID: 5a6a8146dbb6
Revises: db7c2f31d3ea, 4df756383780, a52b5c1d2560
Create Date: 2023-12-12 03:08:38.149095

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "5a6a8146dbb6"
down_revision = ("db7c2f31d3ea", "4df756383780", "a52b5c1d2560")
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
