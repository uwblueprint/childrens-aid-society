import json

from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request

# defines a shared URL prefix for all routes
blueprint = Blueprint("intake", __name__, url_prefix="/intakes")

# define POST endpoint for creating an intake
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"User", "Admin"})
# @validate_request("IntakeDTO")
def create_intake():
    return (
        jsonify({"status": "ok"}),
        200,
    )
