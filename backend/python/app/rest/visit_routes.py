import json

from flask import Blueprint, current_app, jsonify, request

from ..middlewares.auth import require_authorization_by_role
from ..middlewares.validate import validate_request
from ..resources.visit_dto import VisitDTO, CreateVisitDTO
from ..services.implementations.visit_service import VisitService

# define instance of VisitService
visit_service = VisitService(current_app.logger)

# defines a shared URL prefix for all routes
blueprint = Blueprint("visits", __name__, url_prefix="/visits")


@blueprint.route("/", methods=["POST"], strict_slashes=False)
# @require_authorization_by_role({"User", "Admin"})
# @validate_request("VisitDTO")
def create_visit():

    # undos = []
    #
    # def run_undos():
    #     for undo in undos:
    #         service, fn, arg = undo
    #         service.__dict__[fn](arg)
    #
    # # visits
    visit = {
        "user_id": request.json["user_i_d"],
        "case_id": request.json["case_i_d"],
        "family_name": request.json["child_details"]["family_name"],
        "children": request.json["child_details"]["children"],
        "child_service_worker": request.json["child_details"]["child_service_worker"],
        "child_protection_worker": request.json["child_details"]["child_protection_worker"],
        "foster_care_coordinator": request.json["child_details"]["foster_care_coordinator"],
        "visit_date": request.json["visit_details"]["visit_date"],
        "visit_day": request.json["visit_details"]["visit_day"],
        "visit_supervision": request.json["visit_details"]["visit_supervision"],
        "start_time": request.json["visit_details"]["start_time"],
        "end_time": request.json["visit_details"]["end_time"],
        "location": request.json["visit_details"]["location"],
        # TODO FIX THIS
        "visiting_members": request.json["attendance_entries"]["entries"][0]["visiting_members"],
        "visitor_relationship": request.json["attendance_entries"]["entries"][0]["visitor_relationship"],
        "visiting_member_name": request.json["attendance_entries"]["entries"][0]["visiting_member_name"],
        "visit_attendance": request.json["attendance_entries"]["entries"][0]["visit_attendance"],
        "absence_reason": request.json["attendance_entries"]["entries"][0]["absence_reason"],
    }
    #
    # try:
    #     validate_request("CreateVisitDTO")
    #     visit = CreateVisitDTO(**visit)
    #     new_visit = visit_service.create_visit(visit)
    #     undos.append((visit_service, "delete_visit", new_visit.id))
    # except Exception as error:
    #     print("invalid")
    #     run_undos()
    #     return jsonify(str(error)), 400
    #
    # print(new_visit.__dict__) 
    # return jsonify(new_visit.__dict__), 201

    from pprint import pprint 
    pprint(visit)

    return jsonify(visit), 201
