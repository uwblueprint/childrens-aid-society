class AccessTypeDTO:
    def __init__(self, id, access_type, is_default=False):
        self.id = id
        self.access_type = access_type
        self.is_default = is_default
