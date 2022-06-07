from ...models import db
from ..interfaces.child_service import IChildService


class ChildService(IChildService):
    def __init__(self, logger):
        self.logger = logger

    def create_child():
        pass
