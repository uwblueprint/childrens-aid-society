class ConcernDTO:
    def __init__(self, id, type, concern, is_default=False):
        self.id = id
        self.type = type
        self.concern = concern
        self.is_default = is_default
