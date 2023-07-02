from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.caregiver_dto import CreateCaregiverDTO
from ..services.implementations.caregiver_service import CaregiverService

caregiver_service = CaregiverService(current_app.logger)

blueprint = Blueprint("caregiver", __name__, url_prefix="/caregiver")


# get all caregivers
@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_all_caregivers():
    try:
        caregivers = caregiver_service.get_all_caregivers()
        return jsonify(list(map(lambda user: user.__dict__, caregivers))), 200
    except Exception as error:
        return jsonify(error), 400

# get all caregivers by intake_id
@blueprint.route("/<int:intake_id>", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_caregivers_by_intake_id(intake_id):
    if intake_id:
        if type(intake_id) is not int:
            return jsonify({"error:" "intake_id query parameter must be an int"})
    try:
        caregivers = caregiver_service.get_all_caregivers()
        return jsonify(list(map(lambda user: user.__dict__, caregivers))), 200
    except Exception as error:
        return jsonify(error), 400


# create a caregiver
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
@validate_request("CreateCaregiverDTO")
def create_caregiver():
    try:
        caregiver = CreateCaregiverDTO(**request.get_json())
        new_caregiver = caregiver_service.create_caregiver(caregiver)
        return jsonify(new_caregiver.__dict__), 201
    except Exception as error:
        return jsonify(str(error)), 400


# update a caregiver
@blueprint.route("/<int:caregiver_id>", methods=["PUT"], strict_slashes=False)
def update_caregiver(caregiver_id):
    try:
        new_caregiver = request.json
        updated_caregiver = caregiver_service.update_caregiver(
            caregiver_id, new_caregiver
        )
        return jsonify(updated_caregiver.__dict__), 200

    except Exception as error:
        return jsonify(str(error)), 400
