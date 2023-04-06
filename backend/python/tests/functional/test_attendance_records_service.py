import datetime

import pytest
from flask import current_app

from app.models import db
from app.models.attendance_records import AttendanceRecords


@pytest.fixture
def attendance_records_service():
    attendance_records = AttendanceRecords(current_app.logger)
    seed_database()
    yield attendance_records
    teardown_database()


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
    "child_family_support_worker": "Foo Bar",
    "comments": "Hello world",
}


def seed_database():
    attendance_records = AttendanceRecords(**DUMMY_ATTENDANCE_RECORDS_DATA)
    db.session.add(attendance_records)
    db.session.commit()


def teardown_database():
    AttendanceRecords.query.delete()
    db.session.execute("ALTER SEQUENCE attendance_records_id_seq RESTART WITH 1")
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
