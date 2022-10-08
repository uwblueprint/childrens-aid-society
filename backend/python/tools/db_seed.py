import sys

from flask_sqlalchemy import SQLAlchemy

from app import create_app

db = SQLAlchemy()


def tup_to_string_commas(l):
    """
    Convert a tuple to a string with commas between elements.
    e.g. ('a', 'b', 'c') -> "a, b, c"
    """
    return ", ".join([f"{x}" for x in l])


def tup_to_string_commas_and_quotes(l):
    """
    Convert a tuple to a string with commas between elements and single quotes around each element.
    e.g. ('a', 'b', 'c') -> "'a', 'b', 'c'"
    """
    return ", ".join([f"'{x}'" for x in l])


def insert_values(db, table_name: str, column_names: tuple, values: tuple):
    """
    Insert values into a table.
    """
    db.engine.execute(
        f"INSERT INTO {table_name} ({tup_to_string_commas(column_names)}) VALUES ({tup_to_string_commas_and_quotes(values)});"
    )


# fmt: off
def insert_test_data():
    # Users
    values = [
        (1, "Arya",    "Stark", "auth_id_1", "User",  "WINTERFELL"),
        (2, "Bran",    "Stark", "auth_id_2", "User",  "WINTERFELL"),
        (3, "Jon",     "Snow",  "auth_id_3", "Admin", "KNIGHTS_WATCH"),
        (4, "Samwell", "Tarly", "auth_id_4", "User",  "KNIGHTS_WATCH"),
    ]

    for value in values:
        insert_values(db, "users", ("id", "first_name", "last_name", "auth_id", "role", "branch"), value)


    # Addresses
    values = [
        (1, "27 King''s College Cir", "Toronto",  "M5S 1A1", 43.663, -79.397),
        (2, "75 University Ave W",    "Waterloo", "N2L 3C5", 43.472, -80.544),
        (3, "99 University Ave",      "Kingston", "K7L 3N6", 44.229, -76.485),
        (4, "200 University Ave W",   "Waterloo", "N2L 3G1", 43.472, -80.544),
    ]

    for value in values:
        insert_values(db, "addresses", ("id", "street_address", "city", "postal_code", "latitude", "longitude"), value)


    # Concern
    # values = [
    #     (1, "CHILD_BEHAVIOUR",  "Physical aggression",      False),
    #     (2, "CHILD_BEHAVIOUR",  "Inattention",              True),
    #     (3, "FAMILIAL_CONCERN", "Parental physical health", True),
    #     (4, "FAMILIAL_CONCERN", "Parental separation",      False),
    # ]

    # for value in values:
    #     insert_values(db, "concerns", ("id", "type", "concern", "is_default"), value)


    # Goal
    # values = [
    #     (1, "LONG_TERM", "Eat more vegetables",     "2020-01-05", "2023-05-29", False),
    #     (2, "LONG_TERM", "Floss",                   "2020-02-15", "2023-06-30", True),
    #     (3, "SHORT_TERM", "Learn to cook for one",  "2020-02-24", "2023-05-30", True),
    #     (4, "SHORT_TERM", "One Amazing Cartwheel!", "2022-03-06", "2023-06-05", True),
    # ]

    # for value in values:
    #     insert_values(db, "goals", ("id", "type", "goal", "start_date", "end_date", "is_default"), value)

    # Intake
    values = [
        (1, 1, "2020-01-01", "Smith", "cpin1111", True, True, True, "INTERIM_CARE", "11111", "c11111", True, "FIRST_NATION_REGISTERED", "First Nation", "Family strengths", "In person", "Transportation", "Limitations", "2020-01-01", True, "2020-01-01", "2020-01-01", '{"MONDAY", "TUESDAY"}', 1, "10:00", 1, "Denial reason"),
        (2, 2, "2020-03-27", "Jones", "cpin2222", True, True, True, "FINAL_ORDER_FOR_SOCIETY_CARE", "22222", "c22222", True, "ELIGIBLE_FOR_REGISTRATION", "First Nation", "Family strengths", "In person", "Transportation", "Limitations", "2020-03-27", True, "2020-03-27", "2020-03-27", '{"TUESDAY", "MONDAY"}', 1, "03:21:53", 1, "Denial reason"),
        (3, 3, "2020-04-01", "Williams", "cpin3333", False, True, False, "EXTENDED_SOCIETY_CARE", "33333", "c33333", True, "INUIT", "First Nation", "Family strengths", "In person", "Transportation", "Limitations", "2020-04-01", True, "2020-04-01", "2020-04-01", '{"WEDNESDAY", "THURSDAY"}', 1, "23:31:02", 1, "Denial reason"),
        (4, 4, "2020-04-01", "Brown", "cpin4444", False, False, False, "SUPERVISION_ORDER", "44444", "c44444", True, "METIS", "First Nation", "Family strengths", "In person", "Transportation", "Limitations", "2020-05-23", True, "2020-06-01", "2020-04-01", '{"THURSDAY", "WEDNESDAY", "SATURDAY"}', 1, "13:21:02", 1, "Denial reason"),
    ]

    for value in values:
        insert_values(db, "intakes", ("id", "referring_worker_id", "referral_date", "family_name", "cpin_number", "is_investigation", "is_ongoing", "is_court_involved", "court_status", "court_order", "court_order_file", "is_first_nation_heritage", "first_nation_heritage", "first_nation_band", "family_strengths", "access_type", "transportation", "limitations", "case_date", "is_accepted", "date_accepted", "access_start_date", "access_weekday", "access_location_id", "access_time", "lead_access_worker_id", "denial_reason"), value)

    # Daytime Contact
    values = [
        (1, 'Garen', 'Crownguard', 1, '555-555-5555', 'SCHOOL'),
        (2, 'Shieda', 'Kayn', 2, '555-555-5555', 'DAYCARE'),
        (3, 'Sarah', 'Fortune', 3, '555-555-5555', 'SCHOOL'),
        (4, 'Irelia', 'Xan', 4, '555-555-5555', 'DAYCARE'),
    ]

    for value in values:
        insert_values(db, "daytime_contacts", ("id", "contact_first_name", "contact_last_name", "address_id", "phone_number", "type"), value)

    # Child
    values = [
        (1, 1, 'Anya', 'Forger', '2018-01-01', '11111', 1, 1, 'Special needs', True, False),
        (2, 1, 'Damian', 'Desmond', '2018-03-27', '22222', 2, 2, 'Special needs', True, False),
        (3, 2, 'Becky', 'Blackbell', '2018-04-01', '33333', 3, 3, 'Special needs', False, True),
        (4, 3, 'Ewen', 'Egeburg', '2018-04-01', '44444', 4, 4, 'Special needs', False, True),
    ]

    for value in values:
        insert_values(db, "children", ("id", "intake_id", "first_name", "last_name", "date_of_birth", "cpin_number", "child_service_worker_id", "daytime_contact_id", "special_needs", "has_kinship_provider", "has_foster_placement"), value)

    # fmt: on


def nuke_db():
    db.engine.execute("DROP SCHEMA public CASCADE;")
    db.engine.execute("CREATE SCHEMA public;")
    db.engine.execute("GRANT ALL ON SCHEMA public TO postgres;")
    db.engine.execute("GRANT ALL ON SCHEMA public TO public;")
    db.engine.execute("COMMENT ON SCHEMA public IS 'standard public schema';")


if __name__ == "__main__":
    app = create_app("development")
    if "nuke" in sys.argv:
        nuke_db()
    else:
        insert_test_data()
