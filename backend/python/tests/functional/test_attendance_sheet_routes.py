from copy import deepcopy

import pytest

from app import create_app
from app.models import db
from app.models.attendance_sheets import AttendanceSheets

"""
Sample python test.
For more information on pytest, visit:
https://docs.pytest.org/en/6.2.x/reference.html
"""
TEST_ATTENDANCE_SHEETS = [
    {
        "cpw": "BOOOOOOOO",
        "csw": "BOOOOOOOO",
        "family_name": "Scoops",
        "fcc": "BOOOOOOOO",
        "id": 1,
        "intake_id": 124,
        "month": "JANUARY",
    },
    {
        "cpw": "MOOOOOOOO",
        "csw": "MOOOOOOOO",
        "family_name": "Hoops",
        "fcc": "MOOOOOOOO",
        "id": 5,
        "intake_id": 123,
        "month": "JANUARY",
    },
    {
        "cpw": "SOOOOOOOO",
        "csw": "SOOOOOOOO",
        "family_name": "Loop",
        "fcc": "SOOOOOOOO",
        "id": 3,
        "intake_id": 123,
        "month": "JANUARY",
    },
]


def insert_data():
    attendance_instances = [AttendanceSheets(**data) for data in TEST_ATTENDANCE_SHEETS]
    db.session.bulk_save_objects(attendance_instances)
    db.session.commit()


@pytest.fixture(scope="module", autouse=True)
def setup(module_mocker):
    module_mocker.patch(
        "app.services.implementations.auth_service.AuthService.is_authorized_by_role",
        return_value=True,
    )


@pytest.fixture
def test_get_all_attendance_sheet(client):
    insert_data()
    res = client.get("/attendanceSheet")
    for expected_sheet, actual_sheet in zip(TEST_ATTENDANCE_SHEETS, res.json):
        for key in expected_sheet.keys():
            assert expected_sheet[key] == actual_sheet[key]
        for key in actual_sheet.keys():
            assert expected_sheet[key] == actual_sheet[key]


@pytest.fixture
def test_get_attendance_sheet_by_intake_id(client):
    insert_data()

    # get invalid intake id
    res = client.get("/attendanceSheet/?intakeId=4")
    actual_sheets = res.json
    assert [] == actual_sheets

    # get valid intake id
    res = client.get("/attendanceSheet/?intakeId=123")
    expected_sheets, actual_sheets = [
        TEST_ATTENDANCE_SHEETS[1],
        TEST_ATTENDANCE_SHEETS[2],
    ], res.json
    assert expected_sheets == actual_sheets


@pytest.fixture
def test_get_attendance_sheet_by_id(client):
    insert_data()

    # get invalid id
    with pytest.raises(Exception) as exc_info:
        res = client.get("/attendanceSheet/?id=2")
    assert exc_info

    # get valid id
    res = client.get("/attendanceSheet/?id=1").json
    assert len(res) == 1
    assert res[0] == TEST_ATTENDANCE_SHEETS[0]


@pytest.fixture
def test_delete_attendance_sheet_by_id(client):
    insert_data()
    client.delete("/attendanceSheet/?id=1")
    client.delete("/attendanceSheet/?id=3")
    client.delete("/attendanceSheet/?id=5")
    assert AttendanceSheets.query.all() == []


@pytest.fixture
def test_create_attendance_sheet_by_id(client):
    new_sheet_data = TEST_ATTENDANCE_SHEETS[0]
    new_sheet = AttendanceSheets(**new_sheet_data)

    client.post("/attendanceSheet", json=new_sheet_data)
    queried_sheets = AttendanceSheets.query.all()
    assert len(queried_sheets) == 1

    a, b = deepcopy(queried_sheets[0].__dict__), deepcopy(new_sheet.__dict__)
    # compare based on equality our attributes, ignoring SQLAlchemy internal stuff
    a.pop("_sa_instance_state", None)
    b.pop("_sa_instance_state", None)
    assert a == b
