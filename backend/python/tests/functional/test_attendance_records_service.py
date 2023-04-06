import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.attendance_records import AttendanceRecords
from app.models.attendance_sheets import AttendanceSheets
from app.models.intake import Intake
from app.models.user import User
from app.services.implementations.attendance_records_service import (
    AttendanceRecordsService,
)


@pytest.fixture
def attendance_records_service():
    attendance_records = AttendanceRecordsService(current_app.logger)
    seed_database()
    yield attendance_records
    teardown_database()


DUMMY_CHILD_FAMILY_SUPPORT_WORKER_DATA = {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "auth_id": "auth0|123456789",
    "role": "Admin",
    "branch": "ALGOMA",
}

DUMMY_INTAKE_DATA = {
    "id": 1,
    "user_id": 1,
    "referring_worker_name": "John Doe",
    "referring_worker_contact": "johndoe@mail.com",
    "referral_date": datetime.date(2020, 1, 1),
    "family_name": "Doe",
    "cpin_number": "123456789",
    "cpin_file_type": "ONGOING",
    "court_status": "OTHER",
    "court_order_file": "court_order.pdf",
    "transportation_requirements": "car",
    "scheduling_requirements": "flexible",
    "suggested_start_date": datetime.date(2020, 1, 1),
}

DUMMY_ATTENDANCE_SHEETS_DATA = {
    "id": 1,
    "intake_id": 1,
    "family_name": "Doe",
    "month": "JANUARY",
    "csw": "John Doe",
    "cpw": "Jane Doe",
    "fcc": "Bob Doe",
}

DUMMY_ATTENDANCE_RECORDS_DATA = {
    "id": 1,
    "attendance_sheet_id": 1,
    "supervision": "FULL",
    "date": datetime.date(2020, 1, 1),
    "start_time": "4:05pm",
    "end_time": "4:50pm",
    "location": "Oakville, Ontario",
    "attendance": "PRESENT",
    "attending_family": "MOM",
    "staff_transport_time_min": 5,
    "driver_transport_time_min": 10,
    "foster_parent_transport_time_min": 15,
    "child_family_support_worker_id": 1,
    "comments": "Hello world",
}


def seed_database():
    child_family_support_worker = User(**DUMMY_CHILD_FAMILY_SUPPORT_WORKER_DATA)
    intake = Intake(**DUMMY_INTAKE_DATA)
    attendance_sheets = AttendanceSheets(**DUMMY_ATTENDANCE_SHEETS_DATA)
    attendance_records = AttendanceRecords(**DUMMY_ATTENDANCE_RECORDS_DATA)
    db.session.add(child_family_support_worker)
    db.session.commit()
    db.session.add(intake)
    db.session.commit()
    db.session.add(attendance_sheets)
    db.session.commit()
    db.session.add(attendance_records)
    db.session.commit()


def teardown_database():
    AttendanceRecords.query.delete()
    AttendanceSheets.query.delete()
    Intake.query.delete()
    User.query.delete()
    db.session.execute("ALTER SEQUENCE attendance_records_id_seq RESTART WITH 1")
    db.session.execute("ALTER SEQUENCE attendance_sheets_id_seq RESTART WITH 1")
    db.session.execute("ALTER SEQUENCE intake_id_seq RESTART WITH 1")
    db.session.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    db.session.commit()


# class TestUpdate:
#     def test_update_success():
#         pass
#     def test_update_fail():
#         pass


class TestDeletion:
    def test_delete_success(self, attendance_records_service):
        attendance_records_service.delete_attendance_records(1)
        assert AttendanceRecords.query.get(1) is None

    def test_delete_nonexistent_id_fail(self, attendance_records_service):
        with pytest.raises(Exception):
            attendance_records_service.delete_attendance_records(999)
