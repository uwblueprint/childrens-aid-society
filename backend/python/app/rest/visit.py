from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.attendance_records_dto import CreateAttendanceRecordsDTO
from ..services.implementations.attendance_record_service import AttendanceRecordService

attendance_record_service = AttendanceRecordService(current_app.logger)

blueprint = Blueprint("attendanceRecord", __name__, url_prefix="/attendanceRecord")


# get all visits
@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_all_visit():
    intake_id = int(request.args.get("intakeId"))
    id = int(request.args.get("id"))
    try:
        if intake_id and id:
            return jsonify({"error": "Cannot query by both intake id and id"}), 400
        elif intake_id:
            visits = attendance_sheet_service.get_attendance_sheet_by_intake(
                intake_id
            )
            # get attendance_record and combine
        elif id:
            visits = attendance_sheet_service.get_attendance_sheet_by_id(id)
            # get attendance_record and combine
        else:
            visits = attendance_sheet_service.get_all_attendance_sheets()
            # get attendance_record and combine
        return jsonify(list(map(lambda user: user.__dict__, visits))), 200
    except Exception as error:
        return jsonify(error), 400