class TransportationMethodDTO:
    def __init__(self, id, transportation_method):
        self.id = id
        self.transportation_method = transportation_method.upper()


class CreateTransportationMethodDTO:
    def __init__(self, transportation_method):
        error = self.validate(transportation_method)
        if error:
            raise Exception(error)
        self.transportation_method = transportation_method.upper()

    def validate(self, transportation_method):
        error_list = []
        if not transportation_method or type(transportation_method) is not str:
            error_list.append("The transportation_method supplied is not a string.")
        return error_list
