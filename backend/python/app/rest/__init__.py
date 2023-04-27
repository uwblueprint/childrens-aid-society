def init_app(app):
    from . import (
        attendance_sheet_routes,
        auth_routes,
        caregiver_routes,
        child_routes,
        documentation_routes,
        intake_routes,
        user_routes,
        visit_routes,
    )

    app.register_blueprint(auth_routes.blueprint)
    app.register_blueprint(caregiver_routes.blueprint)
    app.register_blueprint(child_routes.blueprint)
    app.register_blueprint(documentation_routes.blueprint)
    app.register_blueprint(intake_routes.blueprint)
    app.register_blueprint(user_routes.blueprint)
    app.register_blueprint(visit_routes.blueprint)
    app.register_blueprint(attendance_sheet_routes.blueprint)
