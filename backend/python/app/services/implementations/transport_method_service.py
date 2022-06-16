from ...models import db
from ...models.transportation_methods import TransportationMethod
from ...resources.transportation_method_dto import (
    CreateTransportationMethodDTO,
    TransportationMethodDTO,
)
from ..interfaces.transport_method_service import ITransportationMethodService


class TransportationMethodService(ITransportationMethodService):
    def __init__(self, logger):
        self.logger = logger
        pass

    def _get_transport_method(self, method):
        try:
            new_method = CreateTransportationMethodDTO(method)

            transportation_method = TransportationMethod.query.filter_by(
                transportation_method=new_method.transportation_method
            ).first()
            if transportation_method:
                return TransportationMethodDTO(
                    transportation_method.id,
                    transportation_method.transportation_method,
                )
            return self._add_transport_method(new_method)
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def _add_transport_method(self, method):
        try:
            new_transportation_method = TransportationMethod(
                transportation_method=method.transportation_method.upper()
            )
            db.session.add(new_transportation_method)
            db.session.commit()
            return TransportationMethodDTO(
                new_transportation_method.id,
                new_transportation_method.transportation_method,
            )
        except Exception as error:
            db.session.rollback()
            raise error
