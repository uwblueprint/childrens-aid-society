from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.visit_cadence_dto import CreateVisitCadenceDTO
from ..services.implementations.visit_cadence_service import VisitCadenceService

visit_cadence_service = VisitCadenceService(current_app.logger)

blueprint = Blueprint("cadence", __name__, url_prefix="/cadence")


# get all cadences
@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_all_cadences():
    try:
        cadences = visit_cadence_service.get_all_cadences()
        return jsonify(list(map(lambda cadence: cadence.__dict__, cadences))), 200
    except Exception as error:
        return jsonify(error), 400


# get all cadences
@blueprint.route("/byIntake", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_cadences_by_intake_id():
    intake_id = int(request.args.get("intake_id"))
    if intake_id:
        if type(intake_id) is not int:
            return jsonify({"error": "intake_id query parameter must be an int"}), 400
        else:
            try:
                cadences = visit_cadence_service.get_cadences_by_intake_id(intake_id)
                return (
                    jsonify(list(map(lambda cadence: cadence.__dict__, cadences))),
                    200,
                )
            except Exception as error:
                return jsonify(error), 400


# create a cadence
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
@validate_request("CreateVisitCadenceDTO")
def create_cadence():
    try:
        cadence = CreateVisitCadenceDTO(**request.get_json())
        new_cadence = visit_cadence_service.create_cadence(cadence)
        return jsonify(new_cadence.__dict__), 201
    except Exception as error:
        return jsonify(str(error)), 400


@blueprint.route("/", methods=["DELETE"], strict_slashes=False)
def delete_cadence():
    """
    Delete cadence by visit_cadence_id specified through a query parameter
    """
    visit_cadence_id = int(request.args.get("visit_cadence_id"))

    if visit_cadence_id:
        if type(visit_cadence_id) is not int:
            return (
                jsonify({"error": "visit_cadence_id query parameter must be an int"}),
                400,
            )
        else:
            try:
                visit_cadence_service.delete_cadence(visit_cadence_id)
                return "intake deleted", 200
            except Exception as e:
                error_message = getattr(e, "message", None)
                return (
                    jsonify({"error": (error_message if error_message else str(e))}),
                    500,
                )

    return (
        jsonify({"error": "Must supply visit_cadence_id as query parameter."}),
        400,
    )


@blueprint.route("/", methods=["PUT"], strict_slashes=False)
def update_cadence_route():
    visit_cadence_id = int(request.args.get("visit_cadence_id"))
    try:
        updated_data = request.json
        updated_cadence = visit_cadence_service.update_cadence(
            visit_cadence_id, updated_data
        )
        return jsonify(updated_cadence.__dict__), 200

    except Exception as error:
        return jsonify(str(error)), 400
