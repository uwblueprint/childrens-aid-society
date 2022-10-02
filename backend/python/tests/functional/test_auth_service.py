import pytest
from flask import current_app

from app.models import db
from app.models.user import User
from app.services.implementations.auth_service import AuthService
from app.services.implementations.user_service import UserService


@pytest.fixture(scope="module", autouse=True)
def setup(module_mocker):
    module_mocker.patch(
        "app.utilities.firebase_rest_client.FirebaseRestClient.sign_in_with_password",
        return_value=FirebaseToken(),
    )
    module_mocker.patch(
        "firebase_admin.auth.get_user_by_email", return_value=FirebaseUser()
    )


@pytest.fixture
def auth_service():
    user_service = UserService(current_app.logger)
    auth_service = AuthService(current_app.logger, user_service)
    yield auth_service
    User.query.delete()


class FirebaseUser:
    """
    Mock returned firebase user
    """

    def __init__(self):
        self.email = "test@test.com"
        self.uid = "A"


class FirebaseToken:
    """
    Mock returned firebase token
    """

    def __init__(self):
        self.access_token = "access"
        self.refresh_token = "refresh"


TEST_USERS = (
    {
        "auth_id": "A",
        "first_name": "Jane",
        "last_name": "Doe",
        "role": "Admin",
    },
)


def insert_users():
    user_instances = [User(**data) for data in TEST_USERS]
    db.session.bulk_save_objects(user_instances)
    db.session.commit()


def test_login(auth_service):
    insert_users()
    auth_service.generate_token("test@test.com", "password")
