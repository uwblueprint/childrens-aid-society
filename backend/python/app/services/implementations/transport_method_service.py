from ...models import db
from ...models.transportation_method import TransportationMethod
from ...resources.transportation_method_dto import TransportationMethodDTO
from ..interfaces.transport_method_service import ITransportationMethodService


class TransportationMethodService(ITransportationMethodService):
    def __init__(self, logger):
        self.logger = logger

    def get_transportation_methods(self):
        try:
            return [
                TransportationMethodDTO(
                    result.id, result.transportation_method, result.is_default
                )
                for result in TransportationMethod.query.all()
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_transportation_method(self, method):
        try:
            transportation_method_upper = method.upper()

            transportation_method = TransportationMethod.query.filter_by(
                transportation_method=transportation_method_upper
            ).first()
            if transportation_method:
                return TransportationMethodDTO(
                    transportation_method.id,
                    transportation_method.transportation_method,
                    transportation_method.is_default,
                )
            return None
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_new_transportation_method(self, transportation_method, is_default):
        try:
            new_transportation_method = TransportationMethod(
                transportation_method=transportation_method.transportation_method.upper(),
                is_default=is_default,
            )
            db.session.add(new_transportation_method)
            db.session.commit()
            return TransportationMethodDTO(
                new_transportation_method.id,
                new_transportation_method.transportation_method,
                new_transportation_method.is_default,
            )
        except Exception as error:
            db.session.rollback()
            raise error
