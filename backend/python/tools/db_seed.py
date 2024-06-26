import sys

from flask_sqlalchemy import SQLAlchemy

from app import app_config, create_app

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

    # Intakes
    values = [
        (1, "ARCHIVED", "Arya Stark", "aryastark@mail.com", "2020-01-01", "Stark", "123456789", "ONGOING", "OTHER", "court_order_file.pdf", "UNKNOWN", "", "transportation_requirements", "scheduling_requirements", "2020-01-01", "2023-01-01", "Kings Landing", "John", "n/a"),
        (1, "ARCHIVED", "Bran Stark", "branstark@mail.com", "2020-01-01", "Stark", "123456789", "ONGOING", "OTHER", "court_order_file.pdf", "UNKNOWN", "", "transportation_requirements", "scheduling_requirements", "2020-01-01", "2023-01-01", "Kings Landing", "Mary", "n/a"),
        (1, "ARCHIVED", "Jon Snow", "jonsnow@mail.com", "2020-01-01", "Snow", "123456789", "ONGOING", "OTHER", "court_order_file.pdf", "UNKNOWN", "", "transportation_requirements", "scheduling_requirements", "2020-01-01", "2023-01-01", "Kings Landing", "Grey", "n/a"),
        (1, "ARCHIVED", "Samwell Tarly", "samwelltarly@mail.com", "2020-01-01", "Tarly", "123456789", "ONGOING", "OTHER", "court_order_file.pdf", "UNKNOWN", "", "transportation_requirements", "scheduling_requirements", "2020-01-01","2023-01-01", "Kings Landing", "Jim", "n/a"),
        (1, "ACTIVE", "Billy Bob", "billybob@mail.com", "2020-01-01", "Bob", "123456789", "ONGOING", "OTHER", "court_order_file.pdf", "UNKNOWN", "", "transportation_requirements", "scheduling_requirements", "2020-01-01", "2023-01-01", "Kings Landing", "Mike", "n/a"),
        (1, "ACTIVE", "Jonathan Johns", "jonjohns@mail.com", "2020-01-01", "Stark", "123456789", "ONGOING", "OTHER", "court_order_file.pdf", "UNKNOWN", "", "transportation_requirements", "scheduling_requirements", "2020-01-01", "2023-01-01", "Kings Landing", "Sarah", "n/a"),
        (1, "ACTIVE", "Peter Parker", "peterparker@mail.com", "2020-01-01", "Snow", "123456789", "ONGOING", "OTHER", "court_order_file.pdf", "UNKNOWN", "", "transportation_requirements", "scheduling_requirements", "2020-01-01",  "2023-01-01", "Kings Landing", "Julia", "n/a", ),
        (1, "PENDING", "Matthew McDonald", "matthewmcdonald@mail.com", "2020-01-01", "Stark", "123456789", "ONGOING", "OTHER", "court_order_file.pdf", "UNKNOWN", "", "transportation_requirements", "scheduling_requirements", "2020-01-01", "2023-01-01", "Kings Landing", "Samantha", "n/a"),
        (1, "PENDING", "Lily Li", "Lily Li@mail.com", "2020-01-01", "Tarly", "123456789", "ONGOING", "OTHER", "court_order_file.pdf", "UNKNOWN", "", "transportation_requirements", "scheduling_requirements", "2020-01-01", "2023-01-01", "Kings Landing", "Noah","n/a"),
    ]

    for value in values:
        insert_values(db, "intakes", ("user_id", "intake_status", "referring_worker_name", "referring_worker_contact", "referral_date", "family_name", "cpin_number", "cpin_file_type", "court_status", "court_order_file", "first_nation_heritage", "first_nation_band", "transportation_requirements", "scheduling_requirements", "suggested_start_date", "date_accepted", "access_location", "lead_access_worker_name", "denial_reason","lead_access_worker_id"), value)

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
        (1, 'Anya Forger', '2018-01-01', '11111', 1, 1, 'Special needs'),
        (1, 'Damian Desmond', '2018-03-27', '22222', 2, 2, 'Special needs'),
        (2, 'Becky Blackbell', '2018-04-01', '33333', 3, 3, 'Special needs'),
        (3, 'Ewen Egeburg', '2018-04-01', '44444', 4, 4, 'Special needs'),
    ]

    for value in values:
        insert_values(db, "children", ("intake_id", "name", "date_of_birth", "cpin_number", "service_worker", "daytime_contact_id", "special_needs"), value)

    # Caregivers
    values = [
        ('Yor Forger', '1999-01-01', 'considerations', '555-555-5555', '777-777-7777', 'email@email.com', 'address', 'ADOPTIVE_PARENT', 'NULL', 1),
        ('Loid Forger', '1999-01-01', 'considerations', '777-777-7777', '555-555-5555', 'email@email.com', 'address', 'ADOPTIVE_PARENT', 'NULL', 1)
    ]

    for value in values:
        insert_values(db, "caregivers", ("name", "date_of_birth", "individual_considerations", "primary_phone_number", "secondary_phone_number", "email", "address", "relationship_to_child", "additional_contact_notes", "intake_id"), value)

    # Other Permitted Individuals
    values = [
        ('Yor Forger', '555-555-5555', 'relationship', 'notes', 1),
        ('Loid Forger', '777-777-7777', 'relationship', 'notes', 1)
    ]

    for value in values:
        insert_values(db, "other_permitted_individuals", ("name", "phone_number", "relationship_to_child", "notes", "intake_id"), value)
        

    # Providers
    values = [
        ('Provider One', '111', '555-555-5555', '777-777-7777', 'provider1@mail.com', 'address', 'KINSHIP_PROVIDER', 'NULL', 1),
        ('Provider Two', '222', '777-777-7777', '555-555-5555', 'provider@mail.com', 'address', 'KINSHIP_PROVIDER', 'NULL', 1)
    ]

    for value in values:
        insert_values(db, "providers", ("name", "file_number", "primary_phone_number", "secondary_phone_number", "email", "address", "relationship_to_child", "additional_contact_notes", "child_id"), value)

    # Attendance Sheets
    values = [(1, 'Zhang', 'csw', 'cpw', 'fcc'), (2, 2, 'Wang', 'a', 'b', 'c')]
    for value in values:
        insert_values(db, "attendance_sheets", ("intake_id", "family_name", "csw", "cpw", "fcc"), value)

    # attendance_record
    values = [
        (1, '2000-10-09', 'Monday', 'PARTIAL','10:00 AM', '01:00 PM', 'Room', 'comments', 1),
        (1, '2010-03-15', 'Friday', 'FULL','07:00 PM', '12:00 AM', 'R1', 'more comments', 2),
        (1, '2011-03-15', 'Tuesday', 'UNSUPERVISED','07:00 PM', '12:00 AM', 'R1', '')
    ]

    for value in values:
       insert_values(db, "attendance_records", ("attendance_sheet_id", "visit_date", "visit_day", "visit_supervision", "start_time", "end_time", "location", "notes", "child_family_support_worker_id"), value)

    # visiting_members
    values = [
        (2,'FOSTER_CAREGIVER','description','Ann', 'PRESENT', ''),
        (2,'STEP_SIBLING','description','Jake', 'NO_SHOW', 'busy')
    ]

    for value in values:
        insert_values(db, "visiting_members", ("attendance_record_id", "visitor_relationship", "description", "visiting_member_name", "visit_attendance", "reason_for_absence"), value)

    # transportation
    values = [
        (2,'Parent','Ann', '10'),
        (2,'Sibling','Ed', '250')
    ]

    for value in values:
        insert_values(db, "transportation", ("attendance_record_id", "guardian", "name", "duration"), value)


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
    db.engine.execute("TRUNCATE TABLE attendance_sheets RESTART IDENTITY CASCADE")
    db.engine.execute("TRUNCATE TABLE attendance_records RESTART IDENTITY CASCADE")

# fmt: on


if __name__ == "__main__":
    app = create_app("development")
    if "clear" in sys.argv:
        clear_rows()
    else:
        insert_test_data()
