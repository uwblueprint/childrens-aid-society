import json

from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.child_dto import ChildDTO
from ..services.implementations.child_service import ChildService


child_service = ChildService(current_app.logger)


blueprint = Blueprint("child", __name__, url_prefix="/children")


@blueprint.route("/", methods=["POST"], strict_slashes=False)
@require_authorization_by_role({"Admin"})
@validate_request("ChildDTO")
def create_child():
    pass