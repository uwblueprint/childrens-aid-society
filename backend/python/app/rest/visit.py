from flask import Blueprint, current_app, jsonify, request
from ..services.implementations.attendance_sheet_service import AttendanceSheetService

attendace_sheet_service = AttendanceSheetService(current_app.logger)
blueprint = Blueprint("attendance_sheets", __name__, url_prefix="/attendance_sheets")

@blueprint.route("/", methods=["DELETE"], strict_slashes=False)
def delete_visit():
    args = request.args
    id = int(args.get("id"))
    # Delete attendance by id, requires id
    if id:
        try:
            attendace_sheet_service.delete_attendance_sheet(id)
            return jsonify({"message": "Attendance sheet deleted successfully"})
        except Exception as error:
            return jsonify({"   error": str(error)}), 500
    else:
        return jsonify({"error": "Must supply id as a query parameter."}), 400


