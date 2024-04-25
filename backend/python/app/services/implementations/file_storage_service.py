from datetime import datetime, timedelta

from ...models import db
from ...models.pdf_file import PdfFile
from ...resources.pdf_file_dto import CreatePdfFileDTO, PdfFileDTO
from ..interfaces.file_storage_service import IFileStorageService


class FileStorageService(IFileStorageService):
    """
    FileStorageService interface for handling blob storage
    """

    def __init__(self, logger):
        """
        Create an instance of FileStorageService with default bucket

        :param logger: application's logger instance
        :type logger: logger
        """
        self.logger = logger

    def get_file(self, file_name, expiration_time=timedelta(minutes=60)):
        blob = self.bucket.get_blob(file_name)
        if not blob:
            return None
        expiration = datetime.now() + expiration_time
        url = blob.generate_signed_url(expiration)
        return url

    def create_file(self, file: CreatePdfFileDTO):
        try:
            if not file:
                raise Exception(
                    "Empty file DTO/None passed to create_file function"
                )
            if not isinstance(file, CreatePdfFileDTO):
                raise Exception("File passed is not of CreatePdfFileDTO type")
            new_file_entry = PdfFile(**file.__dict__)
            db.session.add(new_file_entry)
            db.session.commit()
            return PdfFileDTO(**new_file_entry.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error

    def update_file(self, file_name, file, content_type=None):
        current_blob = self.bucket.get_blob(file_name)
        if not current_blob:
            raise Exception("File name {name} does not exist".format(name=file_name))
        blob = self.bucket.blob(file_name)
        try:
            blob.upload_from_file(file, content_type=content_type)
        except Exception as e:
            reason = getattr(e, "message", None)
            self.logger.error(
                "Failed to update file {name}. Reason = {reason}".format(
                    name=file_name, reason=(reason if reason else str(e))
                )
            )
            raise e

    def delete_file(self, file_name):
        try:
            self.bucket.delete_blob(file_name)
        except Exception as e:
            reason = getattr(e, "message", None)
            self.logger.error(
                "Failed to delete file {name}. Reason = {reason}".format(
                    name=file_name, reason=(reason if reason else str(e))
                )
            )
            raise e
