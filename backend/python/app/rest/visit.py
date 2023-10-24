from flask import Blueprint, current_app, jsonify, request

from ..resources.attendance_sheet_dto import CreateAttendanceSheetDTO
from ..services.implementations.attendance_sheet_service import AttendanceSheetService

attendance_sheet_service = AttendanceSheetService(current_app.logger)
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


