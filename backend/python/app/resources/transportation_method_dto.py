class TransportationMethodDTO:
    def __init__(self, id, transportation_method, show_by_default):
        self.id = id
        self.transportation_method = transportation_method.upper()
        self.show_by_default = show_by_default
