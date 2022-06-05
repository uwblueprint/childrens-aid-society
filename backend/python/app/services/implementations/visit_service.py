from ...models import db
from ..interfaces.visit_service import IVisitService


class VisitService(IVisitService):
    def __init__(self, logger):
        self.logger = logger

    def create_visit():
        pass
