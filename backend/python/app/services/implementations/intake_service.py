from ...models import db
from ...models.transportation_methods import TransportationMethod
from ...resources.transportation_method_dto import TransportationMethodDTO
from ..interfaces.intake_service import IIntakeService


class IntakeService(IIntakeService):
    def __init__(self, logger):
        self.logger = logger
        pass

    def create_intake(self, intake):
        pass

    def _get_transport_method_id(self, method):
        try:
            transportation_method = TransportationMethod.query.filter_by(
                transportation_method=method
            ).first()
            if transportation_method:
                return TransportationMethodDTO(
                    transportation_method.id,
                    transportation_method.transportation_method,
                )
            else:
                return self._add_new_transport_method(method)
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def _add_new_transport_method(self, transportation_method):
        try:
            new_transportation_method = TransportationMethod(
                transportation_method=transportation_method
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
