from ...models import db
from ...models.branch import Branch
from ...resources.branch_dto import BranchDTO
from ..interfaces.branch_service import IBranchService


class BranchService(IBranchService):
    def __init__(self, logger):
        self.logger = logger

    def get_branches(self):
        try:
            return [
                BranchDTO(result.id, result.branch, result.show_by_default)
                for result in Branch.query.all()
            ]
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def get_branch(self, branch):
        try:
            branch_upper = branch.upper()
            branch_entry = Branch.query.filter_by(branch=branch_upper).first()

            if branch_entry:
                return BranchDTO(
                    branch_entry.id, branch_entry.branch, branch_entry.show_by_default
                )
            else:
                return None
        except Exception as error:
            self.logger.error(str(error))
            raise error

    def add_new_branch(self, branch, show_by_default):
        try:
            new_branch_entry = Branch(
                branch=branch.upper(), show_by_default=show_by_default
            )
            db.session.add(new_branch_entry)
            db.session.commit()
            return BranchDTO(
                new_branch_entry.id,
                new_branch_entry.branch,
                new_branch_entry.show_by_default,
            )
        except Exception as error:
            db.session.rollback()
            raise error
