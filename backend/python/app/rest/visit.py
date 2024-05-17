from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.attendance_records_dto import CreateAttendanceRecordsDTO
from ..resources.child_dto import ChildDTO
from ..resources.visit_dto import VisitDTO
from ..services.implementations.attendance_record_service import AttendanceRecordService
from ..services.implementations.attendance_sheet_service import AttendanceSheetService
from ..services.implementations.transport_method_service import (
    TransportationMethodService,
)

attendance_sheet_service = AttendanceSheetService(current_app.logger)
attendance_record_service = AttendanceRecordService(current_app.logger)
transport_method_service = TransportationMethodService(current_app.logger)

blueprint = Blueprint("visit", __name__, url_prefix="/visit")


# create a visit in db
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin", "User"})
@validate_request("VisitDTO")
def create_visit():
    try:
        attendance_sheet = {
            "intake_id": request.json["intake_id"],
            "children": request.json["childInformation"]["children"],
            "family_name": request.json["childInformation"]["familyName"],
            "csw": request.json["childInformation"]["childServiceWorker"],
            "cpw": request.json["childInformation"]["childProtectionWorker"],
            "fcc": request.json["childInformation"]["fosterCareCoordinator"],
        }
        attendance_sheet = CreateAttendanceSheetDTO(**attendance_sheet)

        attendance_record = {
            # "id": request.json["user_id"],
            "attendance_sheet_id": 1,
            "attendance": "PRESENT",  # update
            "attending_family": "MOM",  # update
            "date": request.json["visitTimestamp"]["visitDate"],
            "supervision": request.json["visitTimestamp"]["visitSupervision"],
            "start_time": request.json["visitTimestamp"]["startTime"],
            "end_time": request.json["visitTimestamp"]["endTime"],
            "location": request.json["visitTimestamp"]["location"],
            "comments": request.json["notes"],
            "child_family_support_worker_id": request.json[
                "childAndFamilySupportWorker"
            ],
            "user": request.json["user_id"],
        }
        attendance_record = CreateAttendanceRecordsDTO(**attendance_record)

        # new_attendance_sheet = attendance_sheet_service.create_attendance_sheet(
        #     attendance_sheet
        # )
        new_attendance_record = attendance_record_service.create_attendance_record(
            attendance_record
        )
        # new_visit = [attendance_sheet, attendance_record]
        new_visit = attendance_record

        return jsonify(new_visit.__dict__), 201
    except Exception as error:
        return jsonify("Bad Request: The server cannot process your request."), 400


# get all visits
@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_visits():
    intake_id = request.args.get("intakeId")
    id = request.args.get("id")
    try:
        if intake_id and id:
            return jsonify({"error": "Cannot query by both intake id and id"}), 400
        elif intake_id:
            records = attendance_record_service.get_attendance_record_by_intake(
                int(intake_id)
            )
        elif id:
            records = attendance_record_service.get_attendance_record_by_id(int(id))
        else:
            records = attendance_record_service.get_all_attendance_records()

        visits = []
        for record in records:
            sheet = attendance_sheet_service.get_attendance_sheet_by_id(
                record.attendance_sheet_id
            )[0]

            children = attendance_sheet_service.get_children_by_sheet(sheet.id)
            children = [child.__dict__ for child in children]

            childInformation_obj = {
                "familyName": sheet.family_name,
                "children": children,
                "childServiceWorker": sheet.csw,
                "childProtectionWorker": sheet.cpw,
                "fosterCareCoordinator": sheet.fcc,
            }

            visit = {
                "user_id": record.id,
                "childInformation": childInformation_obj,
                "visitTimestamp": {
                    "visitDate": record.visit_date,
                    "visitDay": record.visit_day,
                    "visitSupervision": record.visit_supervision,
                    "startTime": record.start_time,
                    "endTime": record.end_time,
                    "location": record.location,
                },
                "attendance": {"visitingMembers": []},
                "transportation": [],
                "notes": record.notes,
                "childAndFamilySupportWorker": record.child_family_support_worker_id,
            }
            visits.append(visit)

        visits = [VisitDTO(**visit) for visit in visits]
        return jsonify(list(map(lambda visit: visit.__dict__, visits))), 200
    except Exception as error:
        return jsonify(error), 400


# create a attendance record
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
@validate_request("CreateAttendanceRecordsDTO")
def create_attendance_record():
    try:
        record = CreateAttendanceRecordsDTO(**request.get_json())
        new_record = attendance_record_service.create_attendance_record(record)
        return jsonify(new_record.__dict__), 201
    except Exception as error:
        return jsonify(str(error)), 400


@blueprint.route("/<int:id>", methods=["PUT"], strict_slashes=False)
def update_visit(id):
    try:
        updated_data = request.json

        # Update record
        update_record = attendance_record_service.update_attendance_record(
            id, updated_data
        )

        # Update sheet
        update_sheet = attendance_sheet_service.update_attendance_sheet(
            id, updated_data
        )

        # The response for both
        response_data = {
            "update_record": update_record.__dict__,
            "update_sheet": update_sheet.__dict__,
        }
        return jsonify(response_data), 200
    except Exception as error:
        return jsonify(str(error)), 400


@blueprint.route("/", methods=["DELETE"], strict_slashes=False)
def delete_visit():
    args = request.args
    id = int(args.get("id"))
    if id:
        try:
            attendance_record_service.delete_attendance_record(id)
            attendance_sheet_service.delete_attendance_sheet(id)
            return f"Attendance sheet and record with id: {id} has been deleted", 200
        except Exception as error:
            return jsonify({"error": str(error)}), 500
    else:
        return jsonify({"error": "Must supply id as a query parameter."}), 400
