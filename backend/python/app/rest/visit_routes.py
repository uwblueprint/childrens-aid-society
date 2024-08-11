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
        "user_id": int(data.get("user_id")),
        "case_id": data.get("case_id"),
        "child_details": data.get("child_details"),
        "visit_details": data.get("visit_details"),
        "attendance_entries": data.get("attendance_entries"),
        "transportation_entries": data.get("transportation_entries"),
        "visit_notes": data.get("visit_notes"),
    }

    visit = CreateVisitDTO(**visit_data)
    errors = visit.validate()
    if errors:
        return {"error": errors}, 400
    try:
        visit_service.create_visit(visit)
        return jsonify({"message": "Visit created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@blueprint.route("/<int:user_id>", methods=["GET"], strict_slashes=False)
def get_visit_by_user_id(user_id):
    result = visit_service.get_visit_by_user_id(user_id)
    merged_dict = {}
    for dto in result:
        merged_dict.update(dto.__dict__)
    return (
        jsonify(merged_dict),
        200,
    )
