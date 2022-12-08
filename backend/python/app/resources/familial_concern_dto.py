class FamilialConcernDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.concern = kwargs.get("concern")
        self.is_default = kwargs.get("is_default", False)
