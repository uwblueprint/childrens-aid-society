import json

from flask import Blueprint, current_app, jsonify, request

from ..resources.visit_dto import CreateVisitDTO
from ..services.implementations.visit_service import VisitService

# define instance of VisitService
visit_service = VisitService(current_app.logger)

# defines a shared URL prefix for all routes
blueprint = Blueprint("visits", __name__, url_prefix="/visits")


@blueprint.route("/", methods=["POST"], strict_slashes=False)
def create_visit():
    data = request.json

    visit_data = {
        "user_id": data.get("user_i_d"),
        "childInformation": data.get("child_details"),
        "visitTimestamp": data.get("visit_details", {}).get("visit_date"),
        "attendance": data.get("attendance_entries"),
        "transportation": data.get("transportation_entries"),
        "notes": "placeholder for notes",  # TODO: data.get("notes"),
        "childAndFamilySupportWorker": data.get("child_details", {}).get(
            "child_service_worker"
        ),
    }
    visit = CreateVisitDTO(**visit_data)
    errors = visit.validate()
    if errors:
        return {"error": errors}, 400
    else:
        try:
            visit_service.create_visit(visit)
            return jsonify({"message": "Visit created successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
