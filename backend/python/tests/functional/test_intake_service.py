import pytest
from flask import current_app

from app.services.implementations.intake_service import IntakeService


@pytest.fixture
def intake_service():
    intake_service = IntakeService(current_app.logger)
    yield intake_service
