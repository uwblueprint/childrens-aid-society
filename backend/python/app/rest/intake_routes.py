from flask import Blueprint, jsonify, current_app, request
import json

from ..resources.intake_dto import IntakeDTO
from ..services.implementations import intake_service

# from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request

# defines a shared URL prefix for all routes
blueprint = Blueprint("intake", __name__, url_prefix="/intakes")

# define POST endpoint for creating an intake

intake_service = intake_service.IntakeService(current_app.logger)


@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"User", "Admin"})
@validate_request("IntakeDTO")
def create_intake():
    try:
        if request.content_type == "application/json":
            body = IntakeDTO(**request.json)
    except Exception as e:
        error_message = getattr(e, "message", None)
        return jsonify({"error": (error_message if error_message else str(e))}), 500

    # HTTP status code 201 means Created
    return jsonify(intake_service.create_intake(body)), 201


@blueprint.route("/<int:id>", methods=["PUT"], strict_slashes=False)
# @require_authorization_by_role({"User", "Admin"})
@validate_request("IntakeDTO")
def update_intake(id):
    try:
        if request.content_type == "application/json":
            body = IntakeDTO(**request.json)
    except Exception as e:
        error_message = getattr(e, "message", None)
        return jsonify({"error": (error_message if error_message else str(e))}), 500

    try:
        result = intake_service.update_intake(id, body)
    except Exception as e:
        error_message = getattr(e, "message", None)
        return jsonify({"error": (error_message if error_message else str(e))}), 500

    return jsonify(result), 200
