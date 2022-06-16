from ...models import db
from ...models.branch import Branch
from ...resources.branch_dto import BranchDTO
from ..interfaces.branch_service import IBranchService


class BranchService(IBranchService):
    def __init__(self, logger):
        self.logger = logger
        pass

    def get_branch(self, branch):
        try:
            branch_upper = branch.upper()
            branch_entry = Branch.query.filter_by(branch=branch_upper).first()

            if branch_entry:
                return BranchDTO(branch_entry.id, branch_entry.branch)
            else:
                return self.add_new_branch(branch_upper)
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_new_branch(self, branch):
        try:
            new_branch_entry = Branch(branch=branch.upper())
            db.session.add(new_branch_entry)
            db.session.commit()
            return BranchDTO(new_branch_entry.id, new_branch_entry.branch)
        except Exception as error:
            db.session.rollback()
            raise error
