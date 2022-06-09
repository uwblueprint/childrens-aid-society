class TransportationMethodDTO:
    def __init__(self, id, transportation_method):
        self.id = id
        self.transportation_method = transportation_method


class CreateTransportationMethodDTO:
    def __init__(self, **kwargs):
        self.transportation_method = kwargs.get("transportation_method")

    def validate(self):
        error_list = []
        if (
            not self.transportation_method
            or type(self.transportation_method) is not str
        ):
            error_list.append("The transportation_method supplied is not a string.")
