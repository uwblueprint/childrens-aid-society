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
from ..resources.other_permitted_individual_dto import \
    CreateOtherPermittedIndividualDTO
from ..resources.pdf_file_dto import CreatePdfFileDTO
from ..resources.provider_dto import CreateProviderDTO
from ..services.implementations.caregiver_service import CaregiverService
from ..services.implementations.child_behavior_service import \
    ChildBehaviorService
from ..services.implementations.child_service import ChildService
from ..services.implementations.daytime_contact_service import \
    DaytimeContactService
from ..services.implementations.familial_concern_service import \
    FamilialConcernService
from ..services.implementations.file_storage_service import FileStorageService
from ..services.implementations.goal_service import GoalService
from ..services.implementations.intake_service import IntakeService
from ..services.implementations.other_permitted_individual_service import \
    OtherPermittedIndividualService
from ..services.implementations.provider_service import ProviderService

file_storage_service = FileStorageService(current_app.logger)
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
        intake_new_list = []
        for intake in intakes:
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

            just_children = child_service.get_children_by_intake_id(intake.id)
            new_children = []
            for child in just_children:
                providers = provider_service.get_providers_by_child_id(child.id)
                child_info = {
                    "name": child.name,
                    "dateOfBirth": child.date_of_birth,
                    "cpinFileNumber": child.cpin_number,
                    "serviceWorker": child.service_worker,
                    "specialNeeds": child.special_needs,
                    "concerns": childBehavior_service.get_concerns_str_by_child(
                        child.id
                    ),
                }

                daytime_contact = daytimeContact_service.get_daytime_contact_by_id(
                    child.daytime_contact_id
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

            intake_new = {
                "user_id": intake.user_id,
                "case_id": intake.id,
                "intake_status": intake.intake_status,
                "caseReferral": {
                    "referringWorker": intake.referring_worker_name,
                    "referringWorkerContact": intake.referring_worker_contact,
                    "cpinFileNumber": intake.cpin_number,
                    "cpinFileType": intake.cpin_file_type,
                    "familyName": intake.family_name,
                    "referralDate": intake.referral_date,
                },
                "courtInformation": {
                    "courtStatus": intake.court_status,
                    # backend to frontend mapping here 
                    "orderReferral": intake.court_order_file_id, # worry about this later # maybe this should be the name
                    # "orderReferral": intake.court_order_file,
                    "firstNationHeritage": intake.first_nation_heritage,
                    "firstNationBand": intake.first_nation_band,
                },
                "children": new_children,
                "caregivers": caregivers,
                "programDetails": {
                    "transportationRequirements": intake.transportation_requirements,
                    "schedulingRequirements": intake.scheduling_requirements,
                    "suggestedStartDate": intake.suggested_start_date,
                    "shortTermGoals": goal_service.get_goal_names_by_intake(
                        intake.id, "SHORT_TERM"
                    ),
                    "longTermGoals": goal_service.get_goal_names_by_intake(
                        intake.id, "LONG_TERM"
                    ),
                    "familialConcerns": familialConcern_service.get_familial_concerns_str_by_intake(
                        intake.id
                    ),
                    "permittedIndividuals": new_opis,
                },
            }

            intake_new_list.append(intake_new)

        return jsonify(intake_new_list), 200
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

    # This is where the intake will be created ! -> upload the pdf file here? and then store the 
    # Upload file -> id 
    # court_order_file: id 
    print('all files', request.files)
    print('all form', request.form)

    # TODO: convert all parameters to retrieve from form instead of json!!
    # all files ImmutableMultiDict([('courtInformation[orderReferral]', <FileStorage: 'Jayden_Resume_1.pdf' ('application/pdf')>)])
    # all form ImmutableMultiDict([('userId', '1'), ('intakeStatus', 'ACTIVE'), ('caseReferral[referringWorkerName]', 'DWAEFSF'), ('caseReferral[referringWorkerContact]', '222-222-2222'), ('caseReferral[cpinFileNumber]', '2'), ('caseReferral[cpinFileType]', 'INVESTIGATION'), ('caseReferral[familyName]', 'was'), ('caseReferral[referralDate]', '01/01/2023'), ('courtInformation[courtStatus]', 'INTERIM_CARE'), ('courtInformation[firstNationHeritage]', 'FIRST_NATION_REGISTERED'), ('courtInformation[firstNationBand]', ''), ('children', ''), ('caregivers', ''), ('programDetails[transportRequirements]', 'Kin provider will transport'), ('programDetails[schedulingRequirements]', 'Weekly and time'), ('programDetails[suggestedStartDate]', '01/01/2023'), ('programDetails[shortTermGoals]', 'Caregiver(s) refrain from physical discipline'), ('programDetails[longTermGoals]', 'Caregiver(s) appropriately encourages child(ren) to demonstrate age appropriate social skills'), ('programDetails[familialConcerns]', ''), ('programDetails[permittedIndividuals]', '')])    print('all parameters', request.form[0]["courtInformation"])

    file = request.files["courtInformation[orderReferral]"]
    # print("file name", file.filename)
    # print("file data", file.read())
       
    pdf_file = {
        "file_name": file.filename,
        "file_data": bytes(file.read()),
    }

    try:
        # validate_request("CreatePdfFileDTO")
        pdf_file = CreatePdfFileDTO(**pdf_file)
        new_file = file_storage_service.create_file(pdf_file) # make sure that this inserts into the db
        undos.append((file_storage_service, "delete_file", pdf_file))
    except Exception as error:
        print("invalid pdf file")
        # TODO: reaching an error here
        run_undos()
        return jsonify(str(error)), 400

    print('user id from intake routes', request.form["userId"]);
    # intake
    intake = {
        "user_id": int(request.form["userId"]),
        "intake_status": "SUBMITTED",
        "referring_worker_name": request.form["caseReferral[referringWorkerName]"],
        "referring_worker_contact": request.form["caseReferral[referringWorkerContact]"],
        "referral_date": request.form["caseReferral[referralDate]"],
        "family_name": request.form["caseReferral[familyName]"],
        "cpin_number": request.form["caseReferral[cpinFileNumber]"],
        "cpin_file_type": request.form["caseReferral[cpinFileType]"],
        "court_status": request.form["courtInformation[courtStatus]"],
        # Set id 
        "court_order_file_id": new_file.id,
        "first_nation_heritage": request.form["courtInformation[firstNationHeritage]"],
        "first_nation_band": request.form["courtInformation[firstNationBand]"],
        "transportation_requirements": request.form["programDetails[transportRequirements]"],
        "scheduling_requirements": request.form["programDetails[schedulingRequirements]"],
        "suggested_start_date": request.form["programDetails[suggestedStartDate]"],
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
        print("invalid intake")
        run_undos()
        return jsonify(str(error)), 400

    # caregivers
    # TODO: investigate out how pivot from request.json to request.form impacts caregivers, permitted individuals, etc. 
    caregivers = request.form["caregivers"]
    for caregiver in caregivers:
        # create caregiver using caregiver_routes
        caregiver = {
            "name": caregiver["name"],
            "date_of_birth": caregiver["dateOfBirth"],
            "individual_considerations": caregiver["individualConsiderations"],
            "primary_phone_number": caregiver["primaryPhoneNumber"],
            "secondary_phone_number": caregiver["secondaryPhoneNumber"],
            "email": caregiver.get("email", ""),
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
    permitted_individuals = request.form["programDetails[permittedIndividuals]"]
    # permitted_individuals = request.form["program_details"]["permitted_individuals"]
    for permitted_individual in permitted_individuals:
        permitted_individual = {
            "name": permitted_individual["name"],
            "phone_number": permitted_individual["phoneNumber"],
            "relationship_to_child": permitted_individual["relationshipToChildren"],
            "notes": permitted_individual["additionalNotes"],
            "intake_id": new_intake.id,
        }
        try:
            permitted_individual_response = (
                permittedIndividual_service.create_new_other_permitted_individual(
                    CreateOtherPermittedIndividualDTO(**permitted_individual)
                )
            )
            undos.append(
                (
                    permittedIndividual_service,
                    "delete_other_permitted_individual",
                    permitted_individual_response.id,
                )
            )
        except Exception as error:
            run_undos()
            return jsonify(error), 400

    # familial concerns
    familial_concerns = request.form["programDetails[familialConcerns]"]
    # familial_concerns = request.form["program_details"]["familial_concerns"]
    for familial_concern in familial_concerns:
        familial_concern = {
            "concern": familial_concern,
            "is_default": False,
        }
        try:
            familial_concern_response = familialConcern_service.add_familial_concern(
                **familial_concern
            )
            undos.append(
                (
                    familialConcern_service,
                    "delete_familial_concern",
                    familial_concern_response.id,
                )
            )
        except Exception as error:
            run_undos()
            return jsonify(error), 400

    # goals

    # short term goals
    short_term_goals = request.form["programDetails[shortTermGoals]"]
    # short_term_goals = request.form["program_details"]["short_term_goals"]
    for short_term_goal in short_term_goals:
        new_short_term_goal = {
            "type": "SHORT_TERM",
            "goal": short_term_goal,
        }
        try:
            short_term_goal_response = goal_service.add_new_goal(**new_short_term_goal)
            undos.append((goal_service, "delete_goal", short_term_goal_response.id))
        except Exception as error:
            run_undos()
            return jsonify(error), 400

    # long term goals
    long_term_goals = request.form["programDetails[longTermGoals]"]
    # long_term_goals = request.form["program_details"]["long_term_goals"]
    for long_term_goal in long_term_goals:
        new_long_term_goal = {
            "type": "LONG_TERM",
            "goal": long_term_goal,
        }
        try:
            long_term_goal_response = goal_service.add_new_goal(**new_long_term_goal)
            undos.append((goal_service, "delete_goal", long_term_goal_response.id))
        except Exception as error:
            run_undos()
            return jsonify(error), 400

    children = request.form["children"]
    for child in children:
        # daytime contact
        daytime_contact = child["daytimeContact"]
        daytime_contact = {
            "name": daytime_contact["name"],
            "address": daytime_contact["address"],
            "contact_information": daytime_contact["contactInfo"],
            "dismissal_time": daytime_contact["dismissalTime"],
        }
        try:
            daytime_contact_response = (
                daytimeContact_service.create_new_daytime_contact(
                    CreateDaytimeContactDTO(**daytime_contact)
                )
            )
            undos.append(
                (
                    daytimeContact_service,
                    "delete_daytime_contact",
                    daytime_contact_response.id,
                )
            )
        except Exception as error:
            run_undos()
            return jsonify(error), 400

        # children
        child_obj = {
            "intake_id": new_intake.id,
            "name": child["childInfo"]["name"],
            "date_of_birth": child["childInfo"]["dateOfBirth"],
            "cpin_number": child["childInfo"]["cpinFileNumber"],
            "service_worker": child["childInfo"]["serviceWorker"],
            "daytime_contact_id": daytime_contact_response.id,
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
            child_behavior = {
                "behavior": concern,
                "is_default": False,
            }
            try:
                child_behavior_response = childBehavior_service.add_child_behavior(
                    **child_behavior
                )
                undos.append(
                    (
                        childBehavior_service,
                        "delete_child_behavior",
                        child_behavior_response.id,
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


@blueprint.route("/search", methods=["GET"], strict_slashes=False)
def search_intake():
    args = request.args
    try:
        family_name = args.get("family_name")
        intake_list = []
        try:
            intakes = intake_service.search_intake_family_name(family_name=family_name)
            for intake in intakes:
                intake_new = {
                    "user_id": intake.user_id,
                    "case_id": intake.id,
                    "intake_status": intake.intake_status,
                    "caseReferral": {
                        "referringWorker": intake.referring_worker_name,
                        "referringWorkerContact": intake.referring_worker_contact,
                        "cpinFileNumber": intake.cpin_number,
                        "cpinFileType": intake.cpin_file_type,
                        "familyName": intake.family_name,
                        "referralDate": intake.referral_date,
                    },
                    "courtInformation": {
                        "courtStatus": intake.court_status,
                        "orderReferral": intake.court_order_file_id, # make this the name or something later? or make a separate request to download it/get the name
                        "firstNationHeritage": intake.first_nation_heritage,
                        "firstNationBand": intake.first_nation_band,
                    },
                    "programDetails": {
                        "transportationRequirements": intake.transportation_requirements,
                        "schedulingRequirements": intake.scheduling_requirements,
                        "suggestedStartDate": intake.suggested_start_date,
                    },
                }
                intake_list.append(intake_new)

            return jsonify(intake_list), 200
        except Exception as error:
            return jsonify(str(error)), 200
    except:
        pass
