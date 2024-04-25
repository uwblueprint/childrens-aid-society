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

    def update_file(self, pdf_file_id: int, new_file: CreatePdfFileDTO):
        try:
            if not new_file:
                raise Exception(
                    "Empty file DTO/None passed to update_file function"
                )
            if not isinstance(new_file, CreatePdfFileDTO):
                raise Exception("File passed is not of CreatePdfFileDTO type")
            if not pdf_file_id:
                raise Exception("Empty PDF file id passed to update_file function")
            if not isinstance(pdf_file_id, int):
                raise Exception("Intake id passed is not of int type")
            # replace file at pdf_file_id with new_file
            file = PdfFile.query.filter_by(id=pdf_file_id).first()
            if not file:
                raise Exception("File with id {} not found".format(pdf_file_id))
            file.file_name = new_file.file_name
            file.file_data = new_file.file_data
            db.session.commit()
            return PdfFileDTO(**file.to_dict())
        except Exception as error:
            db.session.rollback()
            raise error

    def delete_file(self, pdf_file_id: int):
        try:
            if not pdf_file_id:
                    raise Exception("Empty PDF file id passed to delete_file function")
            if not isinstance(pdf_file_id, int):
                raise Exception("Intake id passed is not of int type")
            
            file = PdfFile.query.filter_by(id=pdf_file_id).first()
            if not file:
                raise Exception("File with id {} not found".format(pdf_file_id))
            db.session.delete(file)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            raise error
