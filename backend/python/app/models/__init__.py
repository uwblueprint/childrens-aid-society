from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate()


def init_app(app):
    from . import (
        access_type,
        branch,
        caregiver,
        child,
        child_behavior,
        # children_child_behaviors,
        daytime_contact,
        familial_concern,
        goal,
        intake,
        # intakes_concerns,
        # intakes_goals,
        other_permitted_individual,
        provider,
        transportation_method,
        user,
        visit_location,
    )

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
