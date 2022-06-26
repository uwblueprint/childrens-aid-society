class ConcernDTO:
    def __init__(self, id, concern):
        self.id = id
        self.concern = concern.upper()


class CreateConcernDTO:
    def __init__(self, concern):
        error = self.validate(concern)
        if error:
            raise Exception(error)
        self.branch = concern.upper()

    def validate(self, concern):
        error_list = []
        if not concern or type(concern) is not str:
            error_list.append("The concern supplied is not a string.")
        return error_list
