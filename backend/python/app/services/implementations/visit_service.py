from ...models import db
from ..interfaces.visit_service import IVisitService
from ...resources.visit_dto import CreateVisitDTO, VisitDTO

class VisitService(IVisitService):
    def __init__(self, logger):
        self.logger = logger

    def create_visit(self, visit: CreateVisitDTO):
        try:
            if not visit:
                raise Exception(
                    "Empty visit DTO/None passed to create_intake function"
                )
            if not isinstance(visit, CreateVisitDTO):
                pass
        except Exception as error:
            pass

