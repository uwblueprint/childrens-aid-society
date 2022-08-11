class BranchDTO:
    def __init__(self, id, branch, is_default=False):
        self.id = id
        self.branch = branch.upper()
        self.is_default = is_default
