"""make email field optional

Revision ID: 3df009c5afd2
Revises: 0d133fb5505d
Create Date: 2023-11-28 00:48:45.924994

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "3df009c5afd2"
down_revision = "0d133fb5505d"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column("caregivers", "email", existing_type=sa.VARCHAR(), nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column("caregivers", "email", existing_type=sa.VARCHAR(), nullable=False)
    # ### end Alembic commands ###
