from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.attendance_sheet_dto import CreateAttendanceSheetDTO
from ..services.implementations.attendance_sheet_service import AttendanceSheetService

attendance_sheet_service = AttendanceSheetService(current_app.logger)
blueprint = Blueprint("attendanceSheet", __name__, url_prefix="/attendanceSheet")

# create an attendance sheet in db
@blueprint.route("/", methods=["POST"], strict_slashes=False)
@require_authorization_by_role({"Admin", "User"})
@validate_request("CreateAttendanceSheetDTO")
def create_attendance_sheet():
    try:
        attendance_sheet = CreateAttendanceSheetDTO(**request.get_json())
        new_attendance_sheet = attendance_sheet_service.create_attendance_sheet(attendance_sheet)
        return jsonify(new_attendance_sheet.__dict__), 201
    except Exception as error:
        return jsonify(str(error)), 400


# get all attendance sheets, optionally filter by intake_id or id
@blueprint.route("/", methods=["GET"], strict_slashes=False)
@require_authorization_by_role({"Admin", "User"})
def get_attendance_sheet():
    intake_id = request.args.get("intakeId")
    id = request.args.get("id")
    try:
        if intake_id and id:
            return jsonify({"error": "Cannot query by both intake id and id"}), 400
        elif intake_id:
            intake_id = int(intake_id)
            attendance_sheets = attendance_sheet_service.get_attendance_sheet_by_intake(intake_id)
        elif id:
            id = int(id)
            attendance_sheets = attendance_sheet_service.get_attendance_sheet_by_id(id)
        else:
            attendance_sheets = attendance_sheet_service.get_all_attendance_sheets()
        return jsonify(list(map(lambda user: user.__dict__, attendance_sheets))), 200
    except Exception as error:
        return jsonify(error), 400
        
# delete attendance sheet in db by intake id
@blueprint.route("/", methods=["DELETE"], strict_slashes=False)
@require_authorization_by_role({"Admin", "User"})
def delete_attendance_sheet():
    try:
        id = int(request.args.get("id"))
        attendance_sheet_service.delete_attendance_sheet(id)
        return "", 200
    except Exception as error:
        return jsonify(str(error)), 400