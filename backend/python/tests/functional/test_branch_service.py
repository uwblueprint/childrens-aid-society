import pytest
from flask import current_app

from app.models import db
from app.models.branch import Branch
from app.resources.branch_dto import BranchDTO
from app.services.implementations.branch_service import BranchService


@pytest.fixture
def branch_service():
    branch_service = BranchService(current_app.logger)
    seed_database()
    yield branch_service
    Branch.query.delete()


DEFAULT_BRANCH = {"branch": "ALGOMA"}

# TODO: remove this step when migrations are configured to run against test db
def seed_database():
    branch_instance = Branch(**DEFAULT_BRANCH)
    db.session.add(branch_instance)
    db.session.commit()


def test_get_branch_id_success(branch_service):
    res = branch_service.get_branch("ALGOMA")
    assert type(res) is BranchDTO
    assert res.branch == "ALGOMA"


def test_add_new_branch(branch_service):
    res = branch_service.add_new_branch("PICKERING")
    assert type(res) is BranchDTO
    assert Branch.query.get(res.id).branch == "PICKERING"


def test_get_nonexisting_branch(branch_service):
    res = branch_service.get_branch("TORONTO")
    assert res is None


def test_get_branch_invalid_arg(branch_service):
    with pytest.raises(Exception):
        branch_service.get_branch(3143)


def test_get_branch_null_arg_raises_exception(branch_service):
    with pytest.raises(Exception):
        branch_service.get_branch(None)


def test_get_branches_success(branch_service):
    res = branch_service.get_branches()
    assert type(res) == list
    assert len(res) == len(DEFAULT_BRANCH)
    assert all(type(item) == BranchDTO for item in res)
    assert DEFAULT_BRANCH["branch"] == res[0].branch
