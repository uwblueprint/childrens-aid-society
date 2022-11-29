import requests
from flask import Blueprint, current_app, jsonify, request

# from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.intake_dto import CreateIntakeDTO
from ..services.implementations.intake_service import IntakeService

intake_service = IntakeService(current_app.logger)

# defines a shared URL prefix for all routes
blueprint = Blueprint("intake", __name__, url_prefix="/intake")


# get all intakes
@blueprint.route("/", methods=["GET"], strict_slashes=False)
# @require_authorization_by_role({"Admin"})
def get_all_intakes():
    try:
        intakes = intake_service.get_all_intakes()
        return jsonify(list(map(lambda intake: intake.__dict__, intakes))), 200
    except Exception as error:
        return jsonify(error), 400


# create an intake
@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"User", "Admin"})
@validate_request("IntakeDTO")
def create_intake():
    undos = []

    def run_undos():
        for undo in undos:
            service, fn, arg = undo
            service.__dict__[fn](arg)

    # intake_id
    intake_response = intake_service.get_all_intakes()
    intake_id = len(intake_response) + 1

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
            "intake_id": intake_id,
        }
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
            "intake_id": intake_id,
        }
        try:
            permittedIndividual_response = (
                permittedIndividual_service.create_permittedIndividual(
                    permittedIndividual
                )
            )
            undos.append(
                (
                    permittedIndividual_service,
                    "delete_permittedIndividual",
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
            "is_default": False,  # ?
        }
        try:
            familialConcern_response = familialConcern_service.create_familialConcern(
                familialConcern
            )
            undos.append(
                (
                    familialConcern_service,
                    "delete_familialConcern",
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
        shortTermGoal = {
            "type": "SHORT_TERM",
            "goal": shortTermGoal,
            "start_date": None,
            "end_date": None,
            "is_default": False,
        }
        try:
            shortTermGoal_response = goal_service.create_goal(shortTermGoal)
            undos.append((goal_service, "delete_goal", shortTermGoal_response.id))
        except Exception as error:
            run_undos()
            return jsonify(error), 400

    # long term goals
    longTermGoals = request.json["programDetails"]["longTermGoals"]
    for longTermGoal in longTermGoals:
        longTermGoal = {
            "type": "LONG_TERM",
            "goal": longTermGoal,
            "start_date": None,
            "end_date": None,
            "is_default": False,
        }
        try:
            longTermGoal_response = goal_service.create_goal(longTermGoal)
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
            daytimeContact_response = daytimeContact_service.create_daytimeContact(
                daytimeContact
            )
            undos.append(
                (
                    daytimeContact_service,
                    "delete_daytimeContact",
                    daytimeContact_response.id,
                )
            )
        except Exception as error:
            run_undos()
            return jsonify(error), 400

        # children
        child = {
            "intake_id": intake_id,
            "first_name": child["childInfo"]["name"].rsplit(" ", 1)[0],
            "last_name": child["childInfo"]["name"].rsplit(" ", 1)[1],
            "date_of_birth": child["childInfo"]["dateOfBirth"],
            "cpin_number": child["childInfo"]["cpinFileNumber"],
            "child_service_worker_id": 1,  # ?
            "daytime_contact_id": 1,  # ?
            "special_needs": child["childInfo"]["specialNeeds"],
            "has_kinship_provider": False,  # ?
            "has_foster_placement": False,  # ?
        }
        try:
            child_response = child_service.create_child(child)
            undos.append((child_service, "delete_child", child_response.id))
        except Exception as error:
            run_undos()
            return jsonify(error), 400

        # provider
        providers = child["provider"]
        for provider in providers:
            provider = {
                "name": provider["name"],
                "file_number": provider["fileNumber"],
                "primary_phone_number": provider["primaryPhoneNumber"],
                "secondary_phone_number": provider["secondaryPhoneNumber"],
                "email": provider["email"],
                "address": provider["address"],
                "relationship_to_child": provider["relationshipToChild"],
                "additional_contact_notes": provider["additionalContactNotes"],
                "child_id": child_response.json()["id"],
            }
            try:
                provider_response = provider_service.create_provider(provider)
                undos.append(
                    (provider_service, "delete_provider", provider_response.id)
                )
            except Exception as error:
                run_undos()
                return jsonify(error), 400

        # concerns
        concerns = child["concerns"]
        for concern in concerns:
            concern = {
                "concern": concern,
                "is_default": False,  # ?
            }
            try:
                concern_response = concern_service.create_concern(concern)
                undos.append((concern_service, "delete_concern", concern_response.id))
            except Exception as error:
                run_undos()
                return jsonify(error), 400

    # intake
    intake = {
        "user_id": 1,  # ?
        "intake_status": "IN_PROGRESS",
        "referring_worker_name": request.json["caseReferral"]["referringWorker"],
        "referring_worker_contact": request.json["caseReferral"]["cpinFileNumber"],
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
            "transportationRequirements"
        ],
        "scheduling_requirements": request.json["programDetails"][
            "schedulingRequirements"
        ],
        "suggested_start_date": request.json["programDetails"]["suggestedStartDate"],
        "date_accepted": "2020-01-01",  # ?
        "access_weekday": None,  # ?
        "access_location": None,  # ?
        "access_time": None,  # ?
        "lead_access_worker_id": 1,  # ?
        "denial_reason": None,  # ?
    }

    try:
        intake = CreateIntakeDTO(intake)
        new_intake = intake_service.create_intake(intake)
        undos.append((intake_service, "delete_intake", new_intake.id))
        return jsonify(new_intake.__dict__), 201
    except Exception as error:
        run_undos()
        return jsonify(str(error)), 400
