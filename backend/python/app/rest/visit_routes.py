import json

from flask import Blueprint, current_app, jsonify, request

from ..services.implementations.visit_service import VisitService
from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.visit_dto import VisitDTO

# define instance of VisitService
visit_service = VisitService(current_app.logger)

# defines a shared URL prefix for all routes
blueprint = Blueprint("visit", __name__, url_prefix="/visits")

@blueprint.route("/", methods=["POST"], strict_slashes=False)
@require_authorization_by_role({"User", "Admin"})
@validate_request("VisitDTO")
def create_entity():
    try:
        # create a VisitResource object instead of using the raw request body
        # data validators and transformations are applied when constructing the resource,
        # this allows downstream code to make safe assumptions about the data
        if request.content_type == "application/json":
            body = VisitDTO(**request.json)
        else:
            req = json.loads(request.form.get("body"))
            req["file"] = request.files.get("file", default=None)
            body = VisitDTO(**req)
    except Exception as e:
        error_message = getattr(e, "message", None)
        return jsonify({"error": (error_message if error_message else str(e))}), 500

    # HTTP status code 201 means Created
    return jsonify(visit_service.create_visit(body)), 201