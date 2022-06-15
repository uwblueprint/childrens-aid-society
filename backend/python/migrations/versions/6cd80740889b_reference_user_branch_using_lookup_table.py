"""Reference user branch using lookup table

Revision ID: 6cd80740889b
Revises: 8a03057d5a04
Create Date: 2022-06-09 00:54:26.467547

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "6cd80740889b"
down_revision = "8a03057d5a04"
branch_labels = None
depends_on = None


def upgrade():
    op.drop_column("users", "branch")
    op.execute("DROP type branches")
    op.create_table(
        "branches",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("branch", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.add_column(
        "users", sa.Column("branch", sa.String(), default='ALGOMA')
    )
    op.execute("INSERT INTO branches (branch) VALUES ('ALGOMA')")


def downgrade():
    op.drop_column("users", "branch")
    op.drop_table("branches")
    op.execute("CREATE type branches")
    op.add_column("users", sa.Column("branch", sa.String(), default='ALGOMA'))
