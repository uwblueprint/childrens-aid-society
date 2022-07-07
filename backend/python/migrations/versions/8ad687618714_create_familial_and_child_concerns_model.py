"""Create familial and child concerns model

Revision ID: 8ad687618714
Revises: 6cd80740889b
Create Date: 2022-06-13 12:58:15.978295

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "8ad687618714"
down_revision = "6cd80740889b"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    child_concerns = op.create_table(
        "child_concerns",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("concern", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    familial_concerns = op.create_table(
        "familial_concerns",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("concern", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.bulk_insert(
        child_concerns,
        [
            {"concern": "MENTAL_HEALTH"},
            {"concern": "RUNAWAY"},
            {"concern": "CHILD_BEHAVIORS"},
            {"concern": "SEXUAL_ABUSE"},
            {"concern": "DEVELOPMENTAL_DISABILITY"},
            {"concern": "SUBSTANCE_ABUSE"},
            {"concern": "TRUANCY_OR_SCHOOL_PROBLEMS"},
            {"concern": "SUICIDE_ATTEMPTS"},
            {"concern": "MEDICAL_ILLNESS_OR_DISABILITY"},
        ],
    )
    op.bulk_insert(
        familial_concerns,
        [
            {"concern": "FAMILY_CONFLICT"},
            {"concern": "DOMESTIC_VIOLENCE"},
            {"concern": "ISOLATION"},
            {"concern": "WEAPONS_IN_HOME"},
            {"concern": "CHILD_ABUSE"},
            {"concern": "CHILD_NEGLECT"},
            {"concern": "SEXUAL_ABUSE"},
            {"concern": "CHILD_BEHAVIORS"},
            {"concern": "SUBSTANCE_ABUSE"},
            {"concern": "MENTAL_HEALTH"},
            {"concern": "SUICIDE_ATTEMPTS"},
            {"concern": "PARENTING_SKILLS"},
            {"concern": "HOME_MANAGEMENT"},
            {"concern": "POVERTY"},
            {"concern": "DEVELOPMENTAL_DISABILITY"},
            {"concern": "MEDICAL_ILLNESS_OR_DISABILITY"},
        ],
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("familial_concerns")
    op.drop_table("child_concerns")
    # ### end Alembic commands ###