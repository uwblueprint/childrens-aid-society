from ..interfaces.file_storage_service import IFileStorageService
from ..interfaces.intake_service import IIntakeService


class IntakeService(IIntakeService):
    def __init__(self, logger, file_storage_service: IFileStorageService):
        pass

    def create_intake(self, intake):
        pass
