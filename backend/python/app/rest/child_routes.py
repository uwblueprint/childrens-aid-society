import json

from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.child_dto import ChildDTO, CreateChildDTO
from ..services.implementations.child_service import ChildService
from ..services.implementations.provider_service import ProviderService


child_service = ChildService(current_app.logger)
provider_service = ProviderService(current_app.logger)

blueprint = Blueprint("child", __name__, url_prefix="/children")


@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
# @validate_request("ChildDTO")
def create_child():
    undos = []

    def run_undos():
        for undo in undos:
            service, fn, arg = undo
            service.__dict__[fn](arg)

    child_obj = {
        "intake_id": request.json["intake_id"],
        "name": request.json["name"],
        "date_of_birth": request.json["dateOfBirth"],
        "cpin_number": request.json["cpinFileNumber"],
        "service_worker": request.json["serviceWorker"],
        "special_needs": request.json["specialNeeds"],
    }
    try:
        child_response = child_service.add_new_child(CreateChildDTO(**child_obj))
        undos.append((child_service, "delete_child", child_response.id))
    except Exception as error:
        run_undos()
        return jsonify(error), 400

    return jsonify(child_response.__dict__), 201


@blueprint.route("/<int:intake_id>", methods=["PUT"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
# @validate_request("ChildDTO")
def edit_child(intake_id):
    undos = []

    def run_undos():
        for undo in undos:
            service, fn, arg = undo
            service.__dict__[fn](arg)

    child_obj = {
        "intake_id": request.json["intake_id"],
        "first_name": request.json["child"]["childInfo"]["first_name"],
        "last_name": request.json["child"]["childInfo"]["last_name"],
        "date_of_birth": request.json["child"]["childInfo"]["dateOfBirth"],
        "cpin_number": request.json["child"]["childInfo"]["cpinFileNumber"],
        "service_worker": request.json["child"]["childInfo"]["serviceWorker"],
        "daytime_contact_id": request.json["daytimeContact_response"]["id"],
        "special_needs": request.json["child"]["childInfo"]["specialNeeds"],
    }
    try:
        child_response = child_service.edit_child(child_obj, request.json["child_id"])
        # undos.append((child_service, "delete_child", child_response.id))
    except Exception as error:
        # run_undos()
        return jsonify(error), 400

    return jsonify(child_response.__dict__), 200
