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

    len_column_names = len(column_names)
    len_values = len(values)
    column_names = tup_to_string_commas(column_names)
    values = tup_to_string_commas_and_quotes(values)

    # equalize the number of values to the number of columns by adding None
    # values to the end of the values tuple
    if len_column_names > len_values:
        values += ", " + ", ".join(["NULL"] * (len_column_names - len_values))

    db.engine.execute(f"INSERT INTO {table_name} ({column_names}) VALUES ({values});")


# fmt: off
def insert_test_data():
    # Users
    values = [
        ("Arya",    "Stark", "auth_id_1", "User",  "WINTERFELL"),
        ("Bran",    "Stark", "auth_id_2", "User",  "WINTERFELL"),
        ("Jon",     "Snow",  "auth_id_3", "Admin", "KNIGHTS_WATCH"),
        ("Samwell", "Tarly", "auth_id_4", "User",  "KNIGHTS_WATCH"),
    ]

    for value in values:
        insert_values(db, "users", ("first_name", "last_name", "auth_id", "role", "branch"), value)

    # Intake
    values = [
        (1, "2020-01-01", "Smith", "cpin1111", True, True, True, "INTERIM_CARE", "11111", "c11111", True, "FIRST_NATION_REGISTERED", "First Nation", "Family strengths", "In person", "Transportation", "Limitations", "2020-01-01", True, "2020-01-01", "2020-01-01", '{"MONDAY", "TUESDAY"}', 1, "10:00", 1, "Denial reason"),
        (2, "2020-03-27", "Jones", "cpin2222", True, True, True, "FINAL_ORDER_FOR_SOCIETY_CARE", "22222", "c22222", True, "ELIGIBLE_FOR_REGISTRATION", "First Nation", "Family strengths", "In person", "Transportation", "Limitations", "2020-03-27", True, "2020-03-27", "2020-03-27", '{"TUESDAY", "MONDAY"}', 1, "03:21:53", 1, "Denial reason"),
        (3, "2020-04-01", "Williams", "cpin3333", False, True, False, "EXTENDED_SOCIETY_CARE", "33333", "c33333", True, "INUIT", "First Nation", "Family strengths", "In person", "Transportation", "Limitations", "2020-04-01", True, "2020-04-01", "2020-04-01", '{"WEDNESDAY", "THURSDAY"}', 1, "23:31:02", 1, "Denial reason"),
        (4, "2020-04-01", "Brown", "cpin4444", False, False, False, "SUPERVISION_ORDER", "44444", "c44444", True, "METIS", "First Nation", "Family strengths", "In person", "Transportation", "Limitations", "2020-05-23", True, "2020-06-01", "2020-04-01", '{"THURSDAY", "WEDNESDAY", "SATURDAY"}', 1, "13:21:02", 1, "Denial reason"),
    ]

    for value in values:
        insert_values(db, "intakes", ("referring_worker_id", "referral_date", "family_name", "cpin_number", "is_investigation", "is_ongoing", "is_court_involved", "court_status", "court_order", "court_order_file", "is_first_nation_heritage", "first_nation_heritage", "first_nation_band", "family_strengths", "access_type", "transportation", "limitations", "case_date", "is_accepted", "date_accepted", "access_start_date", "access_weekday", "access_location_id", "access_time", "lead_access_worker_id", "denial_reason"), value)

    # Daytime Contact
    values = [
        ('Garen Crownguard', 'Summoners Rift', 'contact info', '3:30pm'),
        ('Shieda Kayn', 'Summoners Rift', 'contact info', '4:00pm'),
        ('Sarah Fortune', 'Summoners Rift', 'contact info', '4:30pm'),
        ('Irelia Xan', 'Summoners Rift', 'contact info', '5:00pm'),
    ]

    for value in values:
        insert_values(db, "daytime_contacts", ("name", "address", "contact_information", "dismissal_time"), value)

    # Child
    values = [
        (1, 'Anya', 'Forger', '2018-01-01', '11111', 1, 1, 'Special needs', True, False),
        (1, 'Damian', 'Desmond', '2018-03-27', '22222', 2, 2, 'Special needs', True, False),
        (2, 'Becky', 'Blackbell', '2018-04-01', '33333', 3, 3, 'Special needs', False, True),
        (3, 'Ewen', 'Egeburg', '2018-04-01', '44444', 4, 4, 'Special needs', False, True),
    ]

    for value in values:
        insert_values(db, "children", ("intake_id", "first_name", "last_name", "date_of_birth", "cpin_number", "child_service_worker_id", "daytime_contact_id", "special_needs", "has_kinship_provider", "has_foster_placement"), value)

    # Caregivers
    values = [
        ('Yor Forger', '1999-01-01', 'considerations', '555-555-5555', '777-777-7777', 'email@email.com', 'address', 'FOSTER_CAREGIVER', 'NULL', 1),
        ('Loid Forger', '1999-01-01', 'considerations', '777-777-7777', '555-555-5555', 'email@email.com', 'address', 'FOSTER_CAREGIVER', 'NULL', 1)
    ]

    for value in values:
        insert_values(db, "caregivers", ("name", "date_of_birth", "individual_considerations", "primary_phone_number", "secondary_phone_number", "email", "address", "relationship_to_child", "additional_contact_notes", "intake_id"), value)

# fmt: on

# fmt: off
def clear_rows():
    # delete all rows, but not the tables
    db.engine.execute("TRUNCATE TABLE addresses RESTART IDENTITY CASCADE")
    db.engine.execute("TRUNCATE TABLE caregivers RESTART IDENTITY CASCADE")
    db.engine.execute("TRUNCATE TABLE children RESTART IDENTITY CASCADE")
    db.engine.execute("TRUNCATE TABLE children RESTART IDENTITY CASCADE")
    db.engine.execute("TRUNCATE TABLE concerns RESTART IDENTITY CASCADE")
    db.engine.execute("TRUNCATE TABLE daytime_contacts RESTART IDENTITY CASCADE")
    db.engine.execute("TRUNCATE TABLE goals RESTART IDENTITY CASCADE")
    db.engine.execute("TRUNCATE TABLE intakes RESTART IDENTITY CASCADE")
    db.engine.execute("TRUNCATE TABLE users RESTART IDENTITY CASCADE")

# fmt: on


if __name__ == "__main__":
    app = create_app("development")
    if "clear" in sys.argv:
        clear_rows()
    else:
        insert_test_data()
