import pytest
from flask import current_app

from app.models import db
from app.models.attendance_records import AttendanceRecords
from app.models.attendance_sheets import AttendanceSheets
from app.resources.attendance_records_dto import (
    AttendanceRecordsDTO,
    CreateAttendanceRecordsDTO,
)
from app.services.implementations.attendance_record_service import (
    AttendanceRecordService,
)

DEFAULT_ATTENDANCE_RECORDS = {
    "id": 1,
    "attendance_sheet_id": 1,
    "visit_date": "2023-01-01",
    "visit_day": "Wednesday",
    "visit_supervision": "FULL",
    "start_time": "1:00",
    "end_time": "22:10",
    "location": "Waterloo",
    "child_family_support_worker_id": None,
    "notes": None,
    "driver_transport_time_min": None,
    "foster_parent_transport_time_min": None,
    "staff_transport_time_min": None,
    "transportation": [],
    "visiting_members": [],
    "user": None,
}


DUMMY_ATTENDANCE_SHEET_DATA = {
    "id": 1,
    "family_name": "yes",
    "csw": "asd",
    "cpw": "asd",
    "fcc": "asd",
}


@pytest.fixture
def visit_attendance_records_service():
    visit_attendance_records_service = AttendanceRecordService(current_app.logger)
    seed_database()
    yield visit_attendance_records_service
    empty_database()


def seed_database():
    empty_database()
    attendance_sheet = AttendanceSheets(**DUMMY_ATTENDANCE_SHEET_DATA)
    db.session.add(attendance_sheet)
    db.session.commit()

    attendance_records_instances = AttendanceRecords(**DEFAULT_ATTENDANCE_RECORDS)
    db.session.add(attendance_records_instances)
    db.session.commit()


def empty_database():
    AttendanceRecords.query.delete()
    db.session.execute("ALTER SEQUENCE attendance_records_id_seq RESTART WITH 1")
    db.session.commit()


def assert_returned_cadences(records, expected):
    assert {
        k: v
        for k, v in records[0].items()
        if k not in ("visiting_members", "transportation")
    } == {
        k: v
        for k, v in expected.items()
        if k not in ("visiting_members", "transportation")
    }


def test_get_all_cadences(visit_attendance_records_service):
    res = visit_attendance_records_service.get_all_attendance_records()
    records = list(map(lambda record: record.__dict__, res))
    assert_returned_cadences(records, DEFAULT_ATTENDANCE_RECORDS)
