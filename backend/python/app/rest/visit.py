from flask import Blueprint, current_app, jsonify, request

from ..resources.attendance_sheet_dto import CreateAttendanceSheetDTO
from ..services.implementations.attendance_sheet_service import AttendanceSheetService
from ..services.implementations.attendance_record_service import AttendanceRecordService
from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..services.implementations.attendance_sheet_service import AttendanceSheetService

from ..resources.attendance_records_dto import CreateAttendanceRecordsDTO
from ..resources.child_dto import ChildDTO
from ..resources.visit_dto import VisitDTO

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
        return jsonify(str(error)), 400from flask import Blueprint, current_app, jsonify, request


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

            children = attendance_sheet_service.get_child_by_sheet(sheet.id)
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
                    "visitDate": record.date,
                    "visitDay": "",
                    "visitSupervision": record.supervision,
                    "startTime": record.start_time,
                    "endTime": record.end_time,
                    "location": record.location,
                },
                "attendance": {"visitingMembers": []},
                "transportation": [],
                "notes": record.comments,
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
