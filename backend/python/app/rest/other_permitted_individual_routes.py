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


# get all other permitted individuals
@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_all_other_permitted_individuals():
    try:
        other_permitted_individuals = (
            other_permitted_individual_service.get_all_other_permitted_individuals()
        )
        return (
            jsonify(list(map(lambda user: user.__dict__, other_permitted_individuals))),
            200,
        )
    except Exception as error:
        return jsonify(error), 400


# create a other_permitted_individual
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
@validate_request("CreateOtherPermittedIndividualDTO")
def create_new_other_permitted_individual():
    try:
        other_permitted_individual = CreateOtherPermittedIndividualDTO(
            **request.get_json()
        )
        new_other_permitted_individual = (
            other_permitted_individual_service.create_new_other_permitted_individual(
                other_permitted_individual
            )
        )
        return jsonify(new_other_permitted_individual.__dict__), 201
    except Exception as error:
        return jsonify(str(error)), 400
