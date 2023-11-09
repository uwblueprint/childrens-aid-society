from flask import Blueprint, current_app, jsonify, request

from ..resources.attendance_sheet_dto import CreateAttendanceSheetDTO
from ..services.implementations.attendance_sheet_service import AttendanceSheetService
from ..services.implementations.attendance_record_service import AttendanceRecordService

attendance_sheet_service = AttendanceSheetService(current_app.logger)
attendance_record_service = AttendanceRecordService(current_app.logger)
blueprint = Blueprint("visit", __name__, url_prefix="/visit")


@blueprint.route("/", methods=["DELETE"], strict_slashes=False)
def delete_visit():
    args = request.args
    id = int(args.get("id"))
    if id:
        try:
            attendance_sheet_service.delete_attendance_sheet(id)

            return f"Attendance sheet with id: {id} has been deleted", 200
        except Exception as error:
            return jsonify({"error": str(error)}), 500
    else:
        return jsonify({"error": "Must supply id as a query parameter."}), 400


@blueprint.route("/<int:id>", methods=["PUT"], strict_slashes=False)
def update_visit(id):
    try:
        updated_data = request.json

        # Update record 
        update_record = attendance_record_service.update_attendance_record(id, updated_data)
        
        # Update sheet 
        update_sheet = attendace_sheet_service.update_attendance_sheet(id, updated_data)
        
        # The response for both 
        response_data = {
            "update_record": update_record.__dict__,
            "update_sheet": update_sheet.__dict__
        }
        return jsonify(response_data), 200
    except Exception as error:
        return jsonify(str(error)), 400