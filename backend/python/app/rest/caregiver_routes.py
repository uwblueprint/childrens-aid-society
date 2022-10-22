import json

from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.caregiver_dto import CaregiverDTO, CreateCaregiverDTO
from ..services.implementations.caregiver_service import CaregiverService

caregiver_service = CaregiverService(current_app.logger)

blueprint = Blueprint("caregiver", __name__, url_prefix="/caregiver")


# get all caregivers
@blueprint.route("/", methods=["GET"], strict_slashes=False)
def get_all_caregivers():
    try:
        caregivers = caregiver_service.get_all_caregivers()
        return jsonify(list(map(lambda user: user.__dict__, caregivers))), 200
    except Exception as error:
        return jsonify(error), 400
