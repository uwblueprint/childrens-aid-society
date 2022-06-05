def init_app(app):
    from . import (
        auth_routes,
        documentation_routes,
        entity_routes,
        intake_routes,
        user_routes,
        visit_routes,
    )

    app.register_blueprint(user_routes.blueprint)
    app.register_blueprint(intake_routes.blueprint)
    app.register_blueprint(auth_routes.blueprint)
    app.register_blueprint(entity_routes.blueprint)
    app.register_blueprint(documentation_routes.blueprint)
    app.register_blueprint(visit_routes.blueprint)
