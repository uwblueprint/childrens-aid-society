class FamilialConcernDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.concern = kwargs.get("concern")
        self.is_default = kwargs.get("is_default", False)


class CreateFamilialConcernDTO(FamilialConcernDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        # mandatory fields
        if not self.concern or type(self.concern) is not str:
            error_list.append("concern is invalid")
        if type(self.is_default) is not bool:
            error_list.append("is_default is invalid")

        return error_list
