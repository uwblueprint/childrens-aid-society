# from flask import Blueprint, current_app, jsonify, send_file

# from ..services.implementations.file_storage_service import FileStorageService

# file_storage_service = FileStorageService(current_app.logger)

# # defines a shared URL prefix for all routes
# blueprint = Blueprint("pdf_file", __name__, url_prefix="/pdf_file")

# # Get rid of this route 
# @blueprint.route("/download/<file_id>", methods=["GET"])
# def download(file_id):
#     try:
#         file_name, file_data = file_storage_service.get_file(file_id)
#         return send_file(
#             file_data,
#             as_attachment=True,
#             attachment_filename=file_name
#         ), 200
#         # return jsonify(updated_intake.__dict__), 200
#     except Exception as error:
#         return jsonify(str(error)), 400
