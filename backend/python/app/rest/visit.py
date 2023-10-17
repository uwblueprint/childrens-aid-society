from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..services.implementations.attendance_sheet_service import AttendanceSheetService

attendance_sheet_service = AttendanceSheetService(current_app.logger)

from ..resources.attendance_records_dto import CreateAttendanceRecordsDTO
from ..services.implementations.attendance_record_service import AttendanceRecordService

attendance_record_service = AttendanceRecordService(current_app.logger)

blueprint = Blueprint("attendanceRecord", __name__, url_prefix="/attendanceRecord")


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
            visits = attendance_sheet_service.get_attendance_sheet_by_intake(
                int(intake_id)
            )
            # get attendance_record and combine
        elif id:
            visits = attendance_sheet_service.get_attendance_sheet_by_id(int(id))
            # get attendance_record and combine
        else:
            visits = attendance_sheet_service.get_all_attendance_sheets()
            # get attendance_record and combine
        return jsonify(list(map(lambda visit: visit.__dict__, visits))), 200
    except Exception as error:
        return jsonify(error), 400
      
# get all attendance records
@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_all_attendance_records():
    try:
        records = attendance_record_service.get_all_attendance_records()
        return jsonify(list(map(lambda record: record.__dict__, records))), 200
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


@blueprint.route("/", methods=["DELETE"], strict_slashes=False)
def delete_attendance_record():
    """
    Delete attendance record by record_id specified through a query parameter
    """
    record_id = int(request.args.get("record_id"))

    if record_id:
        if type(record_id) is not int:
            return (
                jsonify({"error": "record_id query parameter must be an int"}),
                400,
            )
        else:
            try:
                attendance_record_service.delete_attendance_record(record_id)
                return "attendance record deleted", 200
            except Exception as e:
                error_message = getattr(e, "message", None)
                return (
                    jsonify({"error": (error_message if error_message else str(e))}),
                    500,
                )

    return (
        jsonify({"error": "Must supply record_id as query parameter."}),
        400,
    )


@blueprint.route("/", methods=["PUT"], strict_slashes=False)
def update_attendance_record():
    record_id = int(request.args.get("record_id"))
    try:
        updated_data = request.json
        updated_record = attendance_record_service.update_attendance_record(
            record_id, updated_data
        )
        return jsonify(updated_record.__dict__), 200

    except Exception as error:
        return jsonify(str(error)), 400
