from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate()


def init_app(app):
    from .access_type import AccessType
    from .attendance_records import (
        AttendanceRecords,
        Transportation,
        VisitingMember,
        attending_family_enum,
    )
    from .attendance_sheets import AttendanceSheets
    from .branch import Branch
    from .caregiver import Caregiver, relationship_to_child_enum
    from .child import Child
    from .child_behavior import ChildBehavior
    from .daytime_contact import DaytimeContact
    from .familial_concern import FamilialConcern
    from .goal import Goal
    from .intake import Intake
    from .other_permitted_individual import OtherPermittedIndividual
    from .provider import Provider
    from .transportation_method import TransportationMethod
    from .user import User
    from .visit_cadence import VisitCadence
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
