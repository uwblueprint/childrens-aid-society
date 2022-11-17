import json

from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.child_dto import ChildDTO, CreateChildDTO
from ..services.implementations.child_service import ChildService

child_service = ChildService(current_app.logger)

blueprint = Blueprint("child", __name__, url_prefix="/children")


# get all children
@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_all_children():
    try:
        children = child_service.get_all_children()
        return jsonify(list(map(lambda child: child.__dict__, children))), 200
    except Exception as error:
        return jsonify(error), 400


# create a child
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
@validate_request("CreateChildDTO")
def create_child():
    try:
        child = CreateChildDTO(**request.get_json())
        new_child = child_service.add_new_child(child)
        return jsonify(new_child.__dict__), 201
    except Exception as error:
        return jsonify(str(error)), 400


# delete a child by id
@blueprint.route("/<child_id>", methods=["DELETE"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def delete_child(child_id):
    try:
        child_service.delete_child(child_id)
        return jsonify({"message": "Child deleted"}), 204
    except Exception as error:
        return jsonify(str(error)), 400
