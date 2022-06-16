from ..interfaces.intake_service import IIntakeService


class IntakeService(IIntakeService):
    def __init__(self, logger):
        self.logger = logger
        pass

    def create_intake(self, intake):
        pass
