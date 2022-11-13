from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.other_permitted_individual_dto import CreateOtherPermittedIndividualDTO
from ..services.implementations.other_permitted_individual_service import (
    OtherPermittedIndividualService,
)

other_permitted_individual_service = OtherPermittedIndividualService(current_app.logger)

blueprint = Blueprint(
    "other_permitted_individual", __name__, url_prefix="/other_permitted_individual"
)

# create a other_permitted_individual
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
@validate_request("CreateOtherPermittedIndividualDTO")
def create_other_permitted_individual():
    try:
        other_permitted_individual = CreateOtherPermittedIndividualDTO(
            **request.get_json()
        )
        new_other_permitted_individual = (
            other_permitted_individual_service.create_other_permitted_individual(
                other_permitted_individual
            )
        )
        return jsonify(new_other_permitted_individual.__dict__), 201
    except Exception as error:
        return jsonify(str(error)), 400
