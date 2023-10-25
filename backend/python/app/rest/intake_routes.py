import requests
from flask import Blueprint, current_app, jsonify, request

# from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.caregiver_dto import CreateCaregiverDTO
from ..resources.child_dto import CreateChildDTO
from ..resources.daytime_contact_dto import CreateDaytimeContactDTO
from ..resources.familial_concern_dto import CreateFamilialConcernDTO
from ..resources.goal_dto import CreateGoalDTO
from ..resources.intake_dto import CreateIntakeDTO
from ..resources.other_permitted_individual_dto import CreateOtherPermittedIndividualDTO
from ..resources.provider_dto import CreateProviderDTO
from ..services.implementations.caregiver_service import CaregiverService
from ..services.implementations.child_behavior_service import ChildBehaviorService
from ..services.implementations.child_service import ChildService
from ..services.implementations.daytime_contact_service import DaytimeContactService
from ..services.implementations.familial_concern_service import FamilialConcernService
from ..services.implementations.goal_service import GoalService
from ..services.implementations.intake_service import IntakeService
from ..services.implementations.other_permitted_individual_service import (
    OtherPermittedIndividualService,
)
from ..services.implementations.provider_service import ProviderService

intake_service = IntakeService(current_app.logger)
caregiver_service = CaregiverService(current_app.logger)
permittedIndividual_service = OtherPermittedIndividualService(current_app.logger)
familialConcern_service = FamilialConcernService(current_app.logger)
goal_service = GoalService(current_app.logger)
daytimeContact_service = DaytimeContactService(current_app.logger)
child_service = ChildService(current_app.logger)
childBehavior_service = ChildBehaviorService(current_app.logger)
provider_service = ProviderService(current_app.logger)

# defines a shared URL prefix for all routes
blueprint = Blueprint("intake", __name__, url_prefix="/intake")


@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_all_intakes():
    args = request.args
    intake_status = args.get("intake_status")
    page_number = 1
    try:
        page_number = int(args.get("page_number"))
    except:
        pass
    page_limit = 20
    try:
        page_limit = int(args.get("page_limit"))
    except:
        pass
    try:
        intakes = intake_service.get_all_intakes(intake_status, page_number, page_limit)
        for intake in intakes:
            caseReferral = {
                "referringWorker": intake.referring_worker_name,
                "referringWorkerContact": intake.referring_worker_contact,
                "cpinFileNumber": intake.cpin_number,
                "cpinFileType": intake.cpin_file_type,
                "familyName": intake.family_name,
                "referralDate": intake.referral_date,
            }

            intake.caseReferral = caseReferral

            courtInformation = {
                "courtStatus": intake.court_status,
                "orderReferral": intake.court_order_file,
                "firstNationHeritage": intake.first_nation_heritage,
                "firstNationBand": intake.first_nation_band,
            }

            intake.courtInformation = courtInformation

            caregivers_dtos = caregiver_service.get_caregivers_by_intake_id(intake.id)
            caregivers = []
            for caregiver in caregivers_dtos:
                caregiver_obj = {
                    "name": caregiver.name,
                    "dateOfBirth": caregiver.date_of_birth,
                    "individualConsiderations": caregiver.individual_considerations,
                    "primaryPhoneNumber": caregiver.primary_phone_number,
                    "secondaryPhoneNumber": caregiver.secondary_phone_number,
                    "address": caregiver.address,
                    "relationshipToChild": caregiver.relationship_to_child,
                    "additionalContactNotes": caregiver.additional_contact_notes,
                }
                caregivers.append(caregiver_obj)
            intake.caregivers = caregivers

            just_children = child_service.get_children_by_intake_id(intake.id)
            new_children = []
            for child in just_children:
                providers = provider_service.get_providers_by_child_id(child.id)
                child_info = {
                    "name": f"{child.first_name} {child.last_name}",
                    "dateOfBirth": child.date_of_birth,
                    "cpinFileNumber": child.cpin_number,
                    "serviceWorker": child.service_worker,
                    "specialNeeds": child.special_needs,
                    "concerns": childBehavior_service.get_concerns_str_by_child(
                        child.id
                    ),
                }

                daytime_contact = (
                    daytimeContact_service.get_daytime_contact_by_intake_id(intake.id)
                )

                provider_list = []
                for provider in providers:
                    provider_list.append(
                        {
                            "name": provider.name,
                            "fileNumber": provider.file_number,
                            "primaryPhoneNumber": provider.primary_phone_number,
                            "secondaryPhoneNumber": provider.secondary_phone_number,
                            "email": provider.email,
                            "address": provider.address,
                            "relationshipToChild": provider.relationship_to_child,
                            "additionalContactNotes": provider.additional_contact_notes,
                        }
                    )

                new_child = {
                    "childInfo": child_info,
                    "daytimeContact": daytime_contact,
                    "provider": provider_list,
                }

                new_children.append(new_child)
            intake.children = new_children

            opis = permittedIndividual_service.get_other_permitted_individuals_by_intake_id(
                intake.id
            )
            new_opis = []
            for opi in opis:
                new_opi = {
                    "name": opi.name,
                    "phoneNumber": opi.phone_number,
                    "relationshipToChildren": opi.relationship_to_child,
                    "additionalNotes": opi.notes,
                }
                new_opis.append(new_opi)

            program_details = {
                "transportRequirements": intake.transportation_requirements,
                "schedulingRequirements": intake.scheduling_requirements,
                "suggestedStartDate": intake.suggested_start_date,
                "shortTermGoals": goal_service.get_goal_names_by_intake(
                    intake.id, "SHORT_TERM"
                ),
                "longTermGoals": goal_service.get_goal_names_by_intake(
                    intake.id, "LONG_TERM"
                ),
                "familialConcerns": [],  # familialConcern_service.get_familial_concerns_str_by_intake(intake.id),
                "permittedIndividuals": new_opis,
            }
            intake.programDetails = program_details

        return jsonify(list(map(lambda intake: intake.__dict__, intakes))), 200
    except Exception as error:
        return jsonify(error), 400


# create an intake
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"User", "Admin"})
def create_intake():
    undos = []

    def run_undos():
        for undo in undos:
            service, fn, arg = undo
            service.__dict__[fn](arg)

    # intake
    intake = {
        "user_id": request.json["userId"],
        "intake_status": "SUBMITTED",
        "referring_worker_name": request.json["caseReferral"]["referringWorker"],
        "referring_worker_contact": request.json["caseReferral"][
            "referringWorkerContact"
        ],
        "referral_date": request.json["caseReferral"]["referralDate"],
        "family_name": request.json["caseReferral"]["familyName"],
        "cpin_number": request.json["caseReferral"]["cpinFileNumber"],
        "cpin_file_type": request.json["caseReferral"]["cpinFileType"],
        "court_status": request.json["courtInformation"]["courtStatus"],
        "court_order_file": request.json["courtInformation"]["orderReferral"],
        "first_nation_heritage": request.json["courtInformation"][
            "firstNationHeritage"
        ],
        "first_nation_band": request.json["courtInformation"]["firstNationBand"],
        "transportation_requirements": request.json["programDetails"][
            "transportRequirements"
        ],
        "scheduling_requirements": request.json["programDetails"][
            "schedulingRequirements"
        ],
        "suggested_start_date": request.json["programDetails"]["suggestedStartDate"],
        "date_accepted": None,
        "access_location": None,
        "lead_access_worker_id": None,
        "denial_reason": None,
    }

    try:
        validate_request("CreateIntakeDTO")
        intake = CreateIntakeDTO(**intake)
        new_intake = intake_service.create_intake(intake)
        undos.append((intake_service, "delete_intake", new_intake.id))
    except Exception as error:
        print("invalid")
        run_undos()
        return jsonify(str(error)), 400

    # caregivers
    caregivers = request.json["caregivers"]
    for caregiver in caregivers:
        # create caregiver using caregiver_routes
        caregiver = {
            "name": caregiver["name"],
            "date_of_birth": caregiver["dateOfBirth"],
            "individual_considerations": caregiver["individualConsiderations"],
            "primary_phone_number": caregiver["primaryPhoneNumber"],
            "secondary_phone_number": caregiver["secondaryPhoneNumber"],
            "email": caregiver["email"],
            "address": caregiver["address"],
            "relationship_to_child": caregiver["relationshipToChild"],
            "additional_contact_notes": caregiver["additionalContactNotes"],
            "intake_id": new_intake.id,
        }
        caregiver = CreateCaregiverDTO(**caregiver)
        try:
            caregiver_response = caregiver_service.create_caregiver(caregiver)
            undos.append((caregiver_service, "delete_caregiver", caregiver_response.id))
        except Exception as error:
            run_undos()
            return jsonify(error), 400

    # other permitted individuals
    permittedIndividuals = request.json["programDetails"]["permittedIndividuals"]
    for permittedIndividual in permittedIndividuals:
        permittedIndividual = {
            "name": permittedIndividual["name"],
            "phone_number": permittedIndividual["phoneNumber"],
            "relationship_to_child": permittedIndividual["relationshipToChildren"],
            "notes": permittedIndividual["additionalNotes"],
            "intake_id": new_intake.id,
        }
        try:
            permittedIndividual_response = (
                permittedIndividual_service.create_new_other_permitted_individual(
                    CreateOtherPermittedIndividualDTO(**permittedIndividual)
                )
            )
            undos.append(
                (
                    permittedIndividual_service,
                    "delete_other_permitted_individual",
                    permittedIndividual_response.id,
                )
            )
        except Exception as error:
            run_undos()
            return jsonify(error), 400

    # familial concerns
    familialConcerns = request.json["programDetails"]["familialConcerns"]
    for familialConcern in familialConcerns:
        familialConcern = {
            "concern": familialConcern,
            "is_default": False,
        }
        try:
            familialConcern_response = familialConcern_service.add_familial_concern(
                **familialConcern
            )
            undos.append(
                (
                    familialConcern_service,
                    "delete_familial_concern",
                    familialConcern_response.id,
                )
            )
        except Exception as error:
            run_undos()
            return jsonify(error), 400

    # goals

    # short term goals
    shortTermGoals = request.json["programDetails"]["shortTermGoals"]
    for shortTermGoal in shortTermGoals:
        newShortTermGoal = {
            "type": "SHORT_TERM",
            "goal": shortTermGoal,
        }
        try:
            shortTermGoal_response = goal_service.add_new_goal(**newShortTermGoal)
            undos.append((goal_service, "delete_goal", shortTermGoal_response.id))
        except Exception as error:
            run_undos()
            return jsonify(error), 400

    # long term goals
    longTermGoals = request.json["programDetails"]["longTermGoals"]
    for longTermGoal in longTermGoals:
        newLongTermGoal = {
            "type": "LONG_TERM",
            "goal": longTermGoal,
        }
        try:
            longTermGoal_response = goal_service.add_new_goal(**newLongTermGoal)
            undos.append((goal_service, "delete_goal", longTermGoal_response.id))
        except Exception as error:
            run_undos()
            return jsonify(error), 400

    children = request.json["children"]
    for child in children:
        # daytime contact
        daytimeContact = child["daytimeContact"]
        daytimeContact = {
            "name": daytimeContact["name"],
            "address": daytimeContact["address"],
            "contact_information": daytimeContact["contactInfo"],
            "dismissal_time": daytimeContact["dismissalTime"],
        }
        try:
            daytimeContact_response = daytimeContact_service.create_new_daytime_contact(
                CreateDaytimeContactDTO(**daytimeContact)
            )
            undos.append(
                (
                    daytimeContact_service,
                    "delete_daytime_contact",
                    daytimeContact_response.id,
                )
            )
        except Exception as error:
            run_undos()
            return jsonify(error), 400

        # children
        child_obj = {
            "intake_id": new_intake.id,
            "first_name": child["childInfo"]["first_name"],
            "last_name": child["childInfo"]["last_name"],
            "date_of_birth": child["childInfo"]["dateOfBirth"],
            "cpin_number": child["childInfo"]["cpinFileNumber"],
            "service_worker": child["childInfo"]["serviceWorker"],
            "daytime_contact_id": daytimeContact_response.id,
            "special_needs": child["childInfo"]["specialNeeds"],
        }
        try:
            child_response = child_service.add_new_child(CreateChildDTO(**child_obj))
            undos.append((child_service, "delete_child", child_response.id))
        except Exception as error:
            run_undos()
            return jsonify(error), 400

        # provider
        providers = child["provider"]
        for provider in providers:
            provider_obj = {
                "name": provider["name"],
                "file_number": provider["fileNumber"],
                "primary_phone_number": provider["primaryPhoneNumber"],
                "secondary_phone_number": provider["secondaryPhoneNumber"],
                "email": provider["email"],
                "address": provider["address"],
                "relationship_to_child": provider["relationshipToChild"],
                "additional_contact_notes": provider["additionalContactNotes"],
                "child_id": child_response.id,
            }
            try:
                provider_response = provider_service.create_new_provider(
                    CreateProviderDTO(**provider_obj)
                )
                undos.append(
                    (provider_service, "delete_provider", provider_response.id)
                )
            except Exception as error:
                run_undos()
                return jsonify(error), 400

        # concerns
        concerns = child["childInfo"]["concerns"]
        for concern in concerns:
            childBehavior = {
                "behavior": concern,
                "is_default": False,
            }
            try:
                childBehavior_response = childBehavior_service.add_child_behavior(
                    **childBehavior
                )
                undos.append(
                    (
                        childBehavior_service,
                        "delete_child_behavior",
                        childBehavior_response.id,
                    )
                )
            except Exception as error:
                run_undos()
                return jsonify(error), 400

    return jsonify(new_intake.__dict__), 201


@blueprint.route("/", methods=["DELETE"], strict_slashes=False)
def delete_intake():
    """
    Delete intake by intake_id specified through a query parameter
    """
    intake_id = int(request.args.get("intake_id"))

    if intake_id:
        if type(intake_id) is not int:
            return jsonify({"error": "intake_id query parameter must be an int"}), 400
        else:
            try:
                intake_service.delete_intake(intake_id)
                return "intake deleted", 200
            except Exception as e:
                error_message = getattr(e, "message", None)
                return (
                    jsonify({"error": (error_message if error_message else str(e))}),
                    500,
                )

    return (
        jsonify({"error": "Must supply intake id as query parameter."}),
        400,
    )


@blueprint.route("/<int:intake_id>", methods=["PUT"], strict_slashes=False)
def update_intake_route(intake_id):
    try:
        updated_data = request.json
        updated_intake = intake_service.update_intake(intake_id, updated_data)
        return jsonify(updated_intake.__dict__), 200

    except Exception as error:
        return jsonify(str(error)), 400
