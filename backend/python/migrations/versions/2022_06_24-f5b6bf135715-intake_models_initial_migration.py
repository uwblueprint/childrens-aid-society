"""Intake models initial migration

Revision ID: f5b6bf135715
Revises: 
Create Date: 2022-06-24 03:07:26.431170

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "f5b6bf135715"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    access_types = op.create_table(
        "access_types",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("access_type", sa.String(), nullable=False, unique=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "addresses",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("street_address", sa.String(), nullable=False),
        sa.Column("city", sa.String(), nullable=False),
        sa.Column("postal_code", sa.String(), nullable=False),
        sa.Column("latitude", sa.Numeric(precision=8, scale=6), nullable=True),
        sa.Column("longitude", sa.Numeric(precision=9, scale=6), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "branches",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("branch", sa.String(), nullable=False, unique=True),
        sa.PrimaryKeyConstraint("id"),
    )
    child_concerns = op.create_table(
        "child_concerns",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("concern", sa.String(), nullable=False, unique=True),
        sa.PrimaryKeyConstraint("id"),
    )
    familial_concerns = op.create_table(
        "familial_concerns",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("concern", sa.String(), nullable=False, unique=True),
        sa.PrimaryKeyConstraint("id"),
    )
    long_term_goals = op.create_table(
        "long_term_goals",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("goal", sa.String(), nullable=False, unique=True),
        sa.PrimaryKeyConstraint("id"),
    )
    short_term_goals = op.create_table(
        "short_term_goals",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("goal", sa.String(), nullable=False, unique=True),
        sa.PrimaryKeyConstraint("id"),
    )
    transportation_methods = op.create_table(
        "transportation_methods",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("transportation_method", sa.String(), nullable=False, unique=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("first_name", sa.String(), nullable=False),
        sa.Column("last_name", sa.String(), nullable=False),
        sa.Column("auth_id", sa.String(), nullable=False),
        sa.Column(
            "role", sa.Enum("Driver", "User", "Admin", name="users_role"), nullable=True
        ),
        sa.Column("branch", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "visit_locations",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("location", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "daytime_contacts",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("contact_first_name", sa.String(), nullable=False),
        sa.Column("contact_last_name", sa.String(), nullable=False),
        sa.Column("address_id", sa.Integer(), nullable=False),
        sa.Column("phone_number", sa.String(), nullable=False),
        sa.Column(
            "type",
            sa.Enum("SCHOOL", "DAYCARE", name="daytime_contacts_type"),
            nullable=True,
        ),
        sa.ForeignKeyConstraint(
            ["address_id"],
            ["addresses.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "intakes",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("referring_worker_id", sa.Integer(), nullable=True),
        sa.Column("referral_date", sa.Date(), nullable=True),
        sa.Column("family_name", sa.String(), nullable=True),
        sa.Column("cpin_number", sa.String(), nullable=True),
        sa.Column("is_investigation", sa.Boolean(), nullable=True),
        sa.Column("is_ongoing", sa.Boolean(), nullable=True),
        sa.Column("is_court_involved", sa.Boolean(), nullable=True),
        sa.Column(
            "court_status",
            sa.Enum("APPROVED", name="intakes_court_status"),
            nullable=True,
        ),
        sa.Column("court_order", sa.String(), nullable=True),
        sa.Column("court_order_file", sa.String(), nullable=True),
        sa.Column("is_first_nation_heritage", sa.Boolean(), nullable=True),
        sa.Column("first_nation_band", sa.String(), nullable=True),
        sa.Column("family_strengths", sa.String(), nullable=True),
        sa.Column("access_type", sa.String(), nullable=True),
        sa.Column("transportation", sa.String(), nullable=True),
        sa.Column("limitations", sa.String(), nullable=True),
        sa.Column("case_date", sa.Date(), nullable=True),
        sa.Column("is_accepted", sa.Boolean(), nullable=True),
        sa.Column("date_accepted", sa.Date(), nullable=True),
        sa.Column("access_start_date", sa.Date(), nullable=True),
        sa.Column(
            "access_weekday",
            postgresql.ARRAY(
                sa.Enum(
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                    name="intakes_access_weekday",
                )
            ),
            nullable=True,
        ),
        sa.Column("access_location_id", sa.Integer(), nullable=True),
        sa.Column("access_time", sa.Time(), nullable=True),
        sa.Column("lead_access_worker_id", sa.Integer(), nullable=True),
        sa.Column("denial_reason", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["access_location_id"],
            ["addresses.id"],
        ),
        sa.ForeignKeyConstraint(
            ["lead_access_worker_id"],
            ["users.id"],
        ),
        sa.ForeignKeyConstraint(
            ["referring_worker_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "children",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("intake_id", sa.Integer(), nullable=True),
        sa.Column("first_name", sa.String(), nullable=False),
        sa.Column("last_name", sa.String(), nullable=False),
        sa.Column("date_of_birth", sa.Date(), nullable=True),
        sa.Column("cpin_number", sa.String(), nullable=True),
        sa.Column("child_service_worker_id", sa.Integer(), nullable=False),
        sa.Column("daytime_contact_id", sa.Integer(), nullable=False),
        sa.Column("special_needs", sa.String(), nullable=False),
        sa.Column("has_kinship_provider", sa.Boolean(), nullable=False),
        sa.Column("has_foster_placement", sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(
            ["child_service_worker_id"],
            ["users.id"],
        ),
        sa.ForeignKeyConstraint(
            ["daytime_contact_id"],
            ["daytime_contacts.id"],
        ),
        sa.ForeignKeyConstraint(
            ["intake_id"],
            ["intakes.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "caregivers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "type",
            sa.Enum("CAREGIVER", "PROVIDER", name="caregivers_type"),
            nullable=True,
        ),
        sa.Column("first_name", sa.String(), nullable=False),
        sa.Column("last_name", sa.String(), nullable=False),
        sa.Column("is_primary", sa.Boolean(), nullable=True),
        sa.Column("child_id", sa.Integer(), nullable=False),
        sa.Column("address_id", sa.Integer(), nullable=True),
        sa.Column(
            "relationship_to_child",
            sa.Enum(
                "MOM",
                "DAD",
                "FOSTER_MOM",
                "FOSTER_DAD",
                "GRANDPARENT",
                name="caregivers_relationship_to_child",
            ),
            nullable=False,
        ),
        sa.Column("phone_number", sa.String(), nullable=False),
        sa.Column("cpin_number", sa.String(), nullable=True),
        sa.Column("date_of_birth", sa.Date(), nullable=True),
        sa.Column("special_needs", sa.String(), nullable=True),
        sa.Column("name_of_child", sa.String(), nullable=True),
        sa.Column("kinship_worker_name", sa.String(), nullable=True),
        sa.Column("kinship_worker_ext", sa.String(), nullable=True),
        sa.Column("foster_care_coord_name", sa.String(), nullable=True),
        sa.Column("foster_care_coord_ext", sa.String(), nullable=True),
        sa.Column("limitations_for_access", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["child_id"],
            ["children.id"],
        ),
        sa.ForeignKeyConstraint(
            ["address_id"],
            ["addresses.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "intakes_child_concerns",
        sa.Column("intake_id", sa.Integer(), nullable=True),
        sa.Column("concern_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["concern_id"],
            ["child_concerns.id"],
        ),
        sa.ForeignKeyConstraint(
            ["intake_id"],
            ["intakes.id"],
        ),
    )
    op.create_table(
        "intakes_familial_concerns",
        sa.Column("intake_id", sa.Integer(), nullable=True),
        sa.Column("concern_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["concern_id"],
            ["familial_concerns.id"],
        ),
        sa.ForeignKeyConstraint(
            ["intake_id"],
            ["intakes.id"],
        ),
    )
    seed_data(
        access_types,
        child_concerns,
        familial_concerns,
        long_term_goals,
        short_term_goals,
        transportation_methods,
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("intakes_familial_concerns")
    op.drop_table("intakes_child_concerns")
    op.drop_table("caregivers")
    op.drop_table("children")
    op.drop_table("daytime_contacts")
    op.drop_table("intakes")
    op.drop_table("visit_locations")
    op.drop_table("users")
    op.drop_table("transportation_methods")
    op.drop_table("short_term_goals")
    op.drop_table("long_term_goals")
    op.drop_table("familial_concerns")
    op.drop_table("child_concerns")
    op.drop_table("branches")
    op.drop_table("addresses")
    op.drop_table("access_types")

    op.execute("DROP TYPE users_role;")
    op.execute("DROP TYPE caregivers_type;")
    op.execute("DROP TYPE caregivers_relationship_to_child;")
    op.execute("DROP TYPE daytime_contacts_type;")
    op.execute("DROP TYPE intakes_access_weekday;")
    op.execute("DROP TYPE intakes_court_status;")
    # ### end Alembic commands ###


def seed_data(
    access_types,
    child_concerns,
    familial_concerns,
    long_term_goals,
    short_term_goals,
    transportation_methods,
):
    op.bulk_insert(
        access_types,
        [
            {"id": 1, "access_type": "TWICE_WEEKLY"},
            {"id": 2, "access_type": "WEEKLY_ANY_TIME"},
            {"id": 3, "access_type": "WEEKLY_AFTER_SCHOOL"},
            {"id": 4, "access_type": "VIRTUAL"},
        ],
    )

    op.execute("INSERT INTO branches (branch) VALUES ('ALGOMA')")

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
    op.bulk_insert(
        transportation_methods,
        [
            {"transportation_method": "AGENCY_DRIVER"},
            {"transportation_method": "KIN_PROVIDER"},
            {"transportation_method": "FOSTER_PARENT"},
        ],
    )