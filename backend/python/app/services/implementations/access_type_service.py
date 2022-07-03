from ...models import db
from ...models.access_type import AccessType
from ...resources.access_type_dto import AccessTypeDTO, CreateAccessTypeDTO
from ..interfaces.access_type_service import IAccessTypeService


class AccessTypeService(IAccessTypeService):
    def __init__(self, logger):
        self.logger = logger

    def get_access_type(self, access_type):
        try:
            access_type_upper = access_type.upper()
            access_type_entry = AccessType.query.filter_by(
                access_type=access_type_upper
            ).first()

            if access_type_entry:
                return AccessTypeDTO(
                    access_type_entry.id, access_type_entry.access_type
                )
            else:
                return self._add_new_access_type(access_type_upper)
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_access_types(self):
        try:
            return [
                AccessTypeDTO(result.id, result.access_type)
                for result in AccessType.query.all()
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def _add_new_access_type(self, access_type):
        try:
            new_access_type_entry = AccessType(access_type=access_type.upper())
            db.session.add(new_access_type_entry)
            db.session.commit()
            return AccessTypeDTO(
                new_access_type_entry.id, new_access_type_entry.access_type
            )
        except Exception as error:
            db.session.rollback()
            raise error
