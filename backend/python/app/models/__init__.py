from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate()


def init_app(app):
    from .access_type import AccessType
    from .address import Address
    from .branch import Branch
    from .caregiver import Caregiver
    from .child import Child
    from .concern import Concern
    from .daytime_contact import DaytimeContact
    from .goal import Goal
    from .intake import Intake
    from .transportation_method import TransportationMethod
    from .user import User
    from .visit_location import VisitLocation

    app.app_context().push()
    db.init_app(app)
    migrate.init_app(app, db)

    erase_db_and_sync = app.config["TESTING"]

    if erase_db_and_sync:
        # drop tables
        db.reflect()
        db.drop_all()

        # recreate tables
        db.create_all()
