from ..interfaces.intake_service import IIntakeService
from ..interfaces.file_storage_service import IFileStorageService

class IntakeService(IIntakeService):
    def __init__(self, logger, file_storage_service: IFileStorageService):
        pass

    def create_intake(self, intake):
        pass