import pytest
from flask import current_app

from app.models import db
from app.models.branch import Branch
from app.resources.branch_dto import BranchDTO
from app.services.implementations.branch_service import BranchDTO


def test_get_branches_success(access_type_service):
    res = access_type_service.get_branches()
    assert type(res) == list
    assert len(res) == len(DEFAULT_BRANCHES)
    assert all(type(item) == BranchDTO for item in res)
    branches_db = [entry["access_type"] for entry in DEFAULT_BRANCHES]
    branch_res = [item.branch for item in res]
    assert set(branch_db) == set(branch_res)
