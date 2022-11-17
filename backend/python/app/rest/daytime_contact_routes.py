from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.daytime_contact_dto import CreateDaytimeContactDTO
from ..services.implementations.daytime_contact_service import DaytimeContactService

daytime_contact_service = DaytimeContactService(current_app.logger)

blueprint = Blueprint("daytime_contact", __name__, url_prefix="/daytime_contact")


# get all daytime contacts
@blueprint.route("", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role(["ADMIN", "SUPERVISOR", "CAREGIVER"])
def get_all_daytime_contacts():
    try:
        daytime_contacts = daytime_contact_service.get_all_daytime_contacts()
        return jsonify(list(map(lambda user: user.__dict__, daytime_contacts))), 200
    except Exception as error:
        current_app.logger.error(str(error))
        return jsonify({"error": str(error)}), 500


# create a daytime_contact
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
@validate_request("CreateDaytimeContactDTO")
def create_daytime_contact():
    try:
        daytime_contact = CreateDaytimeContactDTO(**request.get_json())
        new_daytime_contact = daytime_contact_service.create_new_daytime_contact(
            daytime_contact
        )
        return jsonify(new_daytime_contact.__dict__), 201
    except Exception as error:
        return jsonify(str(error)), 400
