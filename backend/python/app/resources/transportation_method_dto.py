class TransportationMethodDTO:
    def __init__(self, id, transportation_method, is_default=False):
        self.id = id
        self.transportation_method = transportation_method.upper()
        self.is_default = is_default
