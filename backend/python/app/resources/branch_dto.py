class BranchDTO:
    def __init__(self, id, branch):
        self.id = id
        self.branch = branch.upper()


class CreateBranchDTO:
    def __init__(self, branch):
        error = self.validate(branch)
        if error:
            raise Exception(error)
        self.branch = branch.upper()

    def validate(self, branch):
        error_list = []
        if not branch or type(branch) is not str:
            error_list.append("The branch supplied is not a string.")
        return error_list
