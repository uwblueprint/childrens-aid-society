import json

from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.visit_dto import VisitDTO
from ..services.implementations.visit_service import VisitService

# define instance of VisitService
visit_service = VisitService(current_app.logger)

# defines a shared URL prefix for all routes
blueprint = Blueprint("visit", __name__, url_prefix="/visits")


@blueprint.route("/", methods=["POST"], strict_slashes=False)
@require_authorization_by_role({"User", "Admin"})
@validate_request("VisitDTO")
def create_visit():
    pass
