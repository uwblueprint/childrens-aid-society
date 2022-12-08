class ChildBehaviorDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.behavior = kwargs.get("behavior")
        self.is_default = kwargs.get("is_default")


class CreateChildBehaviorDTO(ChildBehaviorDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if not self.behavior or not type(self.behavior) == str:
            error_list.append("The behavior supplied is invalid")

        # optional fields
        if self.is_default and not type(self.is_default) == bool:
            error_list.append("The is_default supplied is invalid")

        return error_list
