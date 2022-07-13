"""Condense goals and concerns models

Revision ID: 57f14d8ff8bf
Revises: f5b6bf135715
Create Date: 2022-07-03 16:30:10.319400

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "57f14d8ff8bf"
down_revision = "f5b6bf135715"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    concerns = op.create_table(
        "concerns",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "type",
            sa.Enum("FAMILIAL_CONCERN", "CHILD_BEHAVIOUR", name="concerns_type"),
            nullable=False,
        ),
        sa.Column("concern", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    goals = op.create_table(
        "goals",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "type", sa.Enum("SHORT_TERM", "LONG_TERM", name="goals_type"), nullable=True
        ),
        sa.Column("goal", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "intakes_concerns",
        sa.Column("intake_id", sa.Integer(), nullable=True),
        sa.Column("concern_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["concern_id"],
            ["concerns.id"],
        ),
        sa.ForeignKeyConstraint(
            ["intake_id"],
            ["intakes.id"],
        ),
    )
    op.drop_table("intakes_child_concerns")
    op.drop_table("intakes_familial_concerns")
    op.drop_table("familial_concerns")
    op.drop_table("child_concerns")
    op.drop_table("short_term_goals")
    op.drop_table("long_term_goals")

    op.drop_constraint("access_types_access_type_key", "access_types", type_="unique")
    op.drop_constraint("branches_branch_key", "branches", type_="unique")
    op.drop_constraint(
        "transportation_methods_transportation_method_key",
        "transportation_methods",
        type_="unique",
    )

    seed_data(
        concerns,
        goals,
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(
        "transportation_methods_transportation_method_key",
        "transportation_methods",
        ["transportation_method"],
    )
    op.create_unique_constraint("branches_branch_key", "branches", ["branch"])
    op.create_unique_constraint(
        "access_types_access_type_key", "access_types", ["access_type"]
    )
    child_concerns = op.create_table(
        "child_concerns",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("concern", sa.String(), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint("id", name="child_concerns_pkey"),
        sa.UniqueConstraint("concern", name="child_concerns_concern_key"),
        postgresql_ignore_search_path=False,
    )
    familial_concerns = op.create_table(
        "familial_concerns",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("concern", sa.String(), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint("id", name="familial_concerns_pkey"),
        sa.UniqueConstraint("concern", name="familial_concerns_concern_key"),
        postgresql_ignore_search_path=False,
    )
    op.create_table(
        "intakes_familial_concerns",
        sa.Column("intake_id", sa.Integer(), autoincrement=False, nullable=True),
        sa.Column("concern_id", sa.Integer(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(
            ["concern_id"],
            ["familial_concerns.id"],
            name="intakes_familial_concerns_concern_id_fkey",
        ),
        sa.ForeignKeyConstraint(
            ["intake_id"],
            ["intakes.id"],
            name="intakes_familial_concerns_intake_id_fkey",
        ),
    )
    op.create_table(
        "intakes_child_concerns",
        sa.Column("intake_id", sa.Integer(), autoincrement=False, nullable=True),
        sa.Column("concern_id", sa.Integer(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(
            ["concern_id"],
            ["child_concerns.id"],
            name="intakes_child_concerns_concern_id_fkey",
        ),
        sa.ForeignKeyConstraint(
            ["intake_id"], ["intakes.id"], name="intakes_child_concerns_intake_id_fkey"
        ),
    )
    long_term_goals = op.create_table(
        "long_term_goals",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("goal", sa.String(), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint("id", name="long_term_goals_pkey"),
        sa.UniqueConstraint("goal", name="long_term_goals_goal_key"),
    )
    short_term_goals = op.create_table(
        "short_term_goals",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("goal", sa.String(), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint("id", name="short_term_goals_pkey"),
        sa.UniqueConstraint("goal", name="short_term_goals_goal_key"),
    )
    op.drop_table("intakes_concerns")
    op.drop_table("goals")
    op.drop_table("concerns")
    sa.Enum(name="concerns_type").drop(op.get_bind(), checkfirst=False)
    sa.Enum(name="goals_type").drop(op.get_bind(), checkfirst=False)

    # ### end Alembic commands ###
    seed_downgrade_data(
        child_concerns,
        familial_concerns,
        long_term_goals,
        short_term_goals,
    )


def seed_downgrade_data(
    child_concerns,
    familial_concerns,
    long_term_goals,
    short_term_goals,
):

    op.bulk_insert(
        child_concerns,
        [
            {"concern": "MENTAL_HEALTH"},
            {"concern": "RUNAWAY"},
            {"concern": "CHILD_BEHAVIOURS"},
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
            {"concern": "CHILD_BEHAVIOURS"},
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

    op.bulk_insert(
        long_term_goals,
        [
            {
                "goal": "Caregiver(s) encourage/allow child(ren) to demonstrate appropriate emotional/coping skills"
            },
            {
                "goal": "Caregiver(s) encourage child(ren) to meet age appropriate physical and cognitive skills"
            },
            {
                "goal": "Caregiver(s) engage appropriately with their support system (i.e. approved visitors)"
            },
            {
                "goal": "Caregiver(s) appropriately encourages child(ren) to demonstrate age appropriate social skills"
            },
            {
                "goal": "Caregiver(s) appropriately mitigates family conflict (i.e. sibling conflict, parent/child conflict)"
            },
            {
                "goal": "Caregiver(s) demonstrates appropriate communication skills (i.e. parent/child, parent/parent"
            },
            {
                "goal": "Caregiver(s) mental/physical health has minimal impact on parenting/family functioning during visits"
            },
            {
                "goal": "Caregiver(s) cultural differences has minimal impact on parenting/family functioning during visits"
            },
        ],
    )
    op.bulk_insert(
        short_term_goals,
        [
            {"goal": "Caregiver(s) attend consistently"},
            {"goal": "Caregiver(s) attend sober"},
            {
                "goal": "Caregiver(s) have positive, meaningful, and engaging access visits"
            },
            {"goal": "Caregiver(s) refrains from physical discipline"},
            {"goal": "Caregiver(s) demonstrates age appropriate parenting skills"},
            {
                "goal": "Caregiver(s) demonstrates/meets the child(ren) medical/mental health needs"
            },
        ],
    )


def seed_data(concerns, goals):
    op.bulk_insert(
        concerns,
        [
            # CHILD CONCERNS
            {"type": "CHILD_BEHAVIOUR", "concern": "MENTAL_HEALTH"},
            {"type": "CHILD_BEHAVIOUR", "concern": "RUNAWAY"},
            {"type": "CHILD_BEHAVIOUR", "concern": "CHILD_BEHAVIOURS"},
            {"type": "CHILD_BEHAVIOUR", "concern": "SEXUAL_ABUSE"},
            {"type": "CHILD_BEHAVIOUR", "concern": "DEVELOPMENTAL_DISABILITY"},
            {"type": "CHILD_BEHAVIOUR", "concern": "SUBSTANCE_ABUSE"},
            {"type": "CHILD_BEHAVIOUR", "concern": "TRUANCY_OR_SCHOOL_PROBLEMS"},
            {"type": "CHILD_BEHAVIOUR", "concern": "SUICIDE_ATTEMPTS"},
            {"type": "CHILD_BEHAVIOUR", "concern": "MEDICAL_ILLNESS_OR_DISABILITY"},
            # FAMILIAL CONCERNS
            {"type": "FAMILIAL_CONCERN", "concern": "FAMILY_CONFLICT"},
            {"type": "FAMILIAL_CONCERN", "concern": "DOMESTIC_VIOLENCE"},
            {"type": "FAMILIAL_CONCERN", "concern": "ISOLATION"},
            {"type": "FAMILIAL_CONCERN", "concern": "WEAPONS_IN_HOME"},
            {"type": "FAMILIAL_CONCERN", "concern": "CHILD_ABUSE"},
            {"type": "FAMILIAL_CONCERN", "concern": "CHILD_NEGLECT"},
            {"type": "FAMILIAL_CONCERN", "concern": "SEXUAL_ABUSE"},
            {"type": "FAMILIAL_CONCERN", "concern": "CHILD_BEHAVIOURS"},
            {"type": "FAMILIAL_CONCERN", "concern": "SUBSTANCE_ABUSE"},
            {"type": "FAMILIAL_CONCERN", "concern": "MENTAL_HEALTH"},
            {"type": "FAMILIAL_CONCERN", "concern": "SUICIDE_ATTEMPTS"},
            {"type": "FAMILIAL_CONCERN", "concern": "PARENTING_SKILLS"},
            {"type": "FAMILIAL_CONCERN", "concern": "HOME_MANAGEMENT"},
            {"type": "FAMILIAL_CONCERN", "concern": "POVERTY"},
            {"type": "FAMILIAL_CONCERN", "concern": "DEVELOPMENTAL_DISABILITY"},
            {"type": "FAMILIAL_CONCERN", "concern": "MEDICAL_ILLNESS_OR_DISABILITY"},
        ],
    )
    op.bulk_insert(
        goals,
        [
            # LONG TERM GOALS
            {
                "type": "LONG_TERM",
                "goal": "Caregiver(s) encourage/allow child(ren) to demonstrate appropriate emotional/coping skills",
            },
            {
                "type": "LONG_TERM",
                "goal": "Caregiver(s) encourage child(ren) to meet age appropriate physical and cognitive skills",
            },
            {
                "type": "LONG_TERM",
                "goal": "Caregiver(s) engage appropriately with their support system (i.e. approved visitors)",
            },
            {
                "type": "LONG_TERM",
                "goal": "Caregiver(s) appropriately encourages child(ren) to demonstrate age appropriate social skills",
            },
            {
                "type": "LONG_TERM",
                "goal": "Caregiver(s) appropriately mitigates family conflict (i.e. sibling conflict, parent/child conflict)",
            },
            {
                "type": "LONG_TERM",
                "goal": "Caregiver(s) demonstrates appropriate communication skills (i.e. parent/child, parent/parent",
            },
            {
                "type": "LONG_TERM",
                "goal": "Caregiver(s) mental/physical health has minimal impact on parenting/family functioning during visits",
            },
            {
                "type": "LONG_TERM",
                "goal": "Caregiver(s) cultural differences has minimal impact on parenting/family functioning during visits",
            },
            # SHORT TERM GOALS
            {"type": "SHORT_TERM", "goal": "Caregiver(s) attend consistently"},
            {"type": "SHORT_TERM", "goal": "Caregiver(s) attend sober"},
            {
                "type": "SHORT_TERM",
                "goal": "Caregiver(s) have positive, meaningful, and engaging access visits",
            },
            {
                "type": "SHORT_TERM",
                "goal": "Caregiver(s) refrains from physical discipline",
            },
            {
                "type": "SHORT_TERM",
                "goal": "Caregiver(s) demonstrates age appropriate parenting skills",
            },
            {
                "type": "SHORT_TERM",
                "goal": "Caregiver(s) demonstrates/meets the child(ren) medical/mental health needs",
            },
        ],
    )
