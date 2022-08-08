class BranchDTO:
    def __init__(self, id, branch, show_by_default):
        self.id = id
        self.branch = branch.upper()
        self.show_by_default = show_by_default
