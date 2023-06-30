import json

from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.child_dto import ChildDTO, CreateChildDTO
from ..services.implementations.child_service import ChildService

child_service = ChildService(current_app.logger)

blueprint = Blueprint("child", __name__, url_prefix="/children")


@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
@validate_request("ChildDTO")
def create_child():
    undos = []

    def run_undos():
        for undo in undos:
            service, fn, arg = undo
            service.__dict__[fn](arg)
    child_obj = {
        "intake_id": request.intake_id,
        "first_name": request.child["childInfo"]["first_name"],
        "last_name": request.child["childInfo"]["last_name"],
        "date_of_birth": request.child["childInfo"]["dateOfBirth"],
        "cpin_number": request.child["childInfo"]["cpinFileNumber"],
        "service_worker": request.child["childInfo"]["serviceWorker"],
        "daytime_contact_id": request.daytimeContact_response.id,
        "special_needs": request.child["childInfo"]["specialNeeds"],
    }
    try:
        child_response = child_service.add_new_child(
            CreateChildDTO(**child_obj))
        undos.append((child_service, "delete_child", child_response.id))
    except Exception as error:
        run_undos()
        return jsonify(error), 400


@blueprint.route("/", methods=["PUT"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
@validate_request("ChildDTO")
def edit_child():
    undos = []

    def run_undos():
        for undo in undos:
            service, fn, arg = undo
            service.__dict__[fn](arg)
    child_obj = {
        "intake_id": request.intake_id,
        "first_name": request.child["childInfo"]["first_name"],
        "last_name": request.child["childInfo"]["last_name"],
        "date_of_birth": request.child["childInfo"]["dateOfBirth"],
        "cpin_number": request.child["childInfo"]["cpinFileNumber"],
        "service_worker": request.child["childInfo"]["serviceWorker"],
        "daytime_contact_id": request.daytimeContact_response.id,
        "special_needs": request.child["childInfo"]["specialNeeds"],
    }
    try:
        child_response = child_service.add_new_child(
            CreateChildDTO(**child_obj))
        undos.append((child_service, "delete_child", child_response.id))
    except Exception as error:
        run_undos()
        return jsonify(error), 400
