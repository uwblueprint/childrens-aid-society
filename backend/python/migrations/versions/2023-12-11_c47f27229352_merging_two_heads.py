"""merging two heads

Revision ID: c47f27229352
Revises: db7c2f31d3ea, aaa476e7d168, a52b5c1d2560
Create Date: 2023-12-11 15:54:27.666681

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "c47f27229352"
down_revision = ("db7c2f31d3ea", "aaa476e7d168", "a52b5c1d2560")
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
