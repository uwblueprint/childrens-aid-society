import json
import sys
from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.daytime_contact_dto import DaytimeContactDTO, CreateDaytimeContactDTO
from ..resources.child_dto import ChildDTO, CreateChildDTO
from ..services.implementations.child_service import ChildService
from ..services.implementations.provider_service import ProviderService
from ..services.implementations.daytime_contact_service import DaytimeContactService

child_service = ChildService(current_app.logger)
provider_service = ProviderService(current_app.logger)
daytimeContact_service = DaytimeContactService(current_app.logger)

blueprint = Blueprint("child", __name__, url_prefix="/children")

@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_child():
    try:
        args = request.args
        intake_id = args.get("intake_id")
        just_children = child_service.get_children_by_intake_id(intake_id)
        new_children = []
        for child in just_children:
            providers = provider_service.get_providers_by_child_id(child.id)
            child_info = {
                "childName": child.first_name,
                "dateOfBirth": child.date_of_birth,
                "cpinFileNumber": child.cpin_number,
                "workerName": child.service_worker,
                "specialNeeds": child.special_needs,
                "concerns": [],
                "childId": child.id
            }

            #need to get by child_id instead
            daytime_contact = (
                daytimeContact_service.get_daytime_contact_by_intake_id(intake_id)
            )

            provider_list = []
            for provider in providers:
                provider_list.append(
                    {
                        "providerName": provider.name,
                        "providerFileNo": provider.file_number,
                        "primaryPhoneNo": provider.primary_phone_number,
                        "secondaryPhoneNo": provider.secondary_phone_number,
                        "email": provider.email,
                        "address": provider.address,
                        "relationship": provider.relationship_to_child,
                        "contactNotes": provider.additional_contact_notes,
                        "status": "previous"
                    }
                )
        
            new_child = {
                "childDetails": child_info,
                "schoolDetails": daytime_contact,
                "providers": provider_list,
            }

            new_children.append(new_child)
           
        return jsonify(list(new_children)), 200

    except Exception as error:
        return jsonify(error), 400
    

@blueprint.route("/<int:intake_id>", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
# @validate_request("ChildDTO")
def create_child(intake_id):
    undos = []

    def run_undos():
        for undo in undos:
            service, fn, arg = undo
            service.__dict__[fn](arg)

    child_details = request.json["child_details"]
    daytimeContact_details = request.json["school_details"]
    providers = request.json["providers"]

    daytimeContact_obj = {
        "name": daytimeContact_details["school_name"],
        "address": daytimeContact_details["school_address"],
        "contact_information": daytimeContact_details["school_phone_no"],
        "dismissal_time": daytimeContact_details["dismissal_time"],
    }

    try:
        daytime_response = daytimeContact_service.create_new_daytime_contact(CreateDaytimeContactDTO(**daytimeContact_obj))
        print(daytime_response, file=sys.stderr)
        undos.append((daytime_response,"delete_daytime_contact", daytime_response.id)) 
    except Exception as error:
        run_undos()
        return jsonify(error), 400
    
    child_obj = {
        "first_name": child_details["child_name"],
        "last_name": ".",
        "intake_id": intake_id,
        "date_of_birth": child_details["date_of_birth"],
        "cpin_number": child_details["cpin_file_number"],
        "service_worker": child_details["worker_name"],
        "special_needs": child_details["special_needs"],
        "daytime_contact_id": daytime_response.id
    }

    try:
        child_response = child_service.add_new_child(CreateChildDTO(**child_obj))
        print(child_response, file=sys.stderr)
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
    
    child_details = request.json["child_details"]
    daytimeContact_details = request.json["school_details"] 
    providers = request.json["providers"]

    child_obj = {
        "first_name": child_details["child_name"],
        "last_name": ".",
        "date_of_birth": child_details["date_of_birth"],
        "cpin_number":  child_details["cpin_file_number"],
        "service_worker": child_details["worker_name"],
        "special_needs": child_details["special_needs"],
    }

    try:
        child_response = child_service.edit_child(child_obj, child_details["child_id"])
        #print(child_response, file=sys.stderr)
        # undos.append((child_service, "delete_child", child_response.id))
    except Exception as error:
        # run_undos()
        return jsonify(error),400
    
    # daytimeContact_obj ={
    #     "name": daytimeContact_details["school_name"],
    #     "contact_information": daytimeContact_details["school_phone_no"],
    #     "address": daytimeContact_details["school_address"],
    #     "dismissal_time": daytimeContact_details["dismissal_time"],
    # }

    # try: 
    #    daytime_response = daytimeContact_service.edit_daytime_contact(daytimeContact_obj, daytimeContact_details["school_id"])
    # except Exception as error:
    #     # run_undos()
    #     return jsonify(error),400


    return jsonify(child_response.__dict__), 200
