import pytest
from flask import current_app

from app.models.branch import Branch
from app.resources.branch_dto import BranchDTO
from app.services.implementations.branch_service import BranchService


@pytest.fixture
def branch_service():
    branch_service = BranchService(current_app.logger)
    yield branch_service

def test_get_branch_id_success(branch_service):
    res = branch_service.get_branch("ALGOMA")
    assert type(res) is BranchDTO
    assert res.id == 1


def test_add_new_branch_success(branch_service):
    res = branch_service.get_branch("TORONTO")
    assert type(res) is BranchDTO
    assert res.id == 2
    assert Branch.query.get(res.id).branch == "TORONTO"

    res2 = branch_service.get_branch("OTTAWA")
    assert type(res2) is BranchDTO
    assert res2.id == 3
    assert Branch.query.get(res2.id).branch == "OTTAWA"
