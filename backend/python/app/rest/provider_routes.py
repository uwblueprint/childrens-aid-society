from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.provider_dto import CreateProviderDTO
from ..services.implementations.provider_service import ProviderService

provider_service = ProviderService(current_app.logger)

blueprint = Blueprint("provider", __name__, url_prefix="/provider")


# get all providers
@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_all_providers():
    try:
        providers = provider_service.get_all_providers()
        return jsonify(list(map(lambda user: user.__dict__, providers))), 200
    except Exception as error:
        return jsonify(error), 400


# create a provider
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
@validate_request("CreateProviderDTO")
def create_provider():
    try:
        provider = CreateProviderDTO(**request.get_json())
        new_provider = provider_service.create_new_provider(provider)
        return jsonify(new_provider.__dict__), 201
    except Exception as error:
        return jsonify(str(error)), 400


# delete a provider by id
@blueprint.route("/<int:provider_id>", methods=["DELETE"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def delete_provider(provider_id):
    try:
        provider_service.delete_provider(provider_id)
        return jsonify({"message": "Provider deleted successfully"}), 204
    except Exception as error:
        return jsonify(str(error)), 400
