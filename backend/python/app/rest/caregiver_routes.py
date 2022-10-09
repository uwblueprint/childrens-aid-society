import json

from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.caregiver_dto import CaregiverDTO, CreateCaregiverDTO
from ..services.implementations.caregiver_service import CaregiverService

caregiver_service = CaregiverService(current_app.logger)

blueprint = Blueprint("caregiver", __name__, url_prefix="/caregiver")


@blueprint.route("/", methods=["POST"], strict_slashes=False)
@require_authorization_by_role({"Admin"})
@validate_request("CaregiverDTO")
def create_caregiver():
    try:
        caregiver = CaregiverDTO(**request.get_json())
        caregiver_service.create_caregiver(caregiver)
        return jsonify({"message": "Caregiver created successfully"}), 201
    except Exception as e:
        error_message = getattr(e, "message", None)
        return jsonify({"error": (error_message if error_message else str(e))}), 500


# only create_caregiver is defined for CaregiverService (for now)
# @blueprint.route("/<int:caregiver_id>", methods=["PUT"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
# @validate_request("CaregiverDTO")
# def update_caregiver(caregiver_id):
#     try:
#         caregiver = CaregiverDTO(**request.get_json())
#         caregiver_service.update_caregiver(caregiver_id, caregiver)
#         return jsonify({"message": "Caregiver updated successfully"}), 200
#     except Exception as e:
#         error_message = getattr(e, "message", None)
#         return jsonify({"error": (error_message if error_message else str(e))}), 500


# @blueprint.route("/<int:caregiver_id>", methods=["DELETE"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
# def delete_caregiver(caregiver_id):
#     try:
#         caregiver_service.delete_caregiver(caregiver_id)
#         return jsonify({"message": "Caregiver deleted successfully"}), 200
#     except Exception as e:
#         error_message = getattr(e, "message", None)
#         return jsonify({"error": (error_message if error_message else str(e))}), 500


# @blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
# def get_all_caregivers():
#     try:
#         caregivers = caregiver_service.get_all_caregivers()
#         return jsonify(caregivers), 200
#     except Exception as e:
#         error_message = getattr(e, "message", None)
#         return jsonify({"error": (error_message if error_message else str(e))}), 500


# @blueprint.route("/<int:caregiver_id>", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
# def get_caregiver_by_id(caregiver_id):
#     try:
#         caregiver = caregiver_service.get_caregiver_by_id(caregiver_id)
#         return jsonify(caregiver), 200
#     except Exception as e:
#         error_message = getattr(e, "message", None)
#         return jsonify({"error": (error_message if error_message else str(e))}), 500
