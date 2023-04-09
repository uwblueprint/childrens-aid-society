from app import create_app
from app.models import db


"""
Wipe postgres db as well as any associated auth entried within firebase auth store
"""

app = create_app("development")

from app.rest.user_routes import user_service # we have to import this after create_app since application context hasn't been pushed onto stack yet
for userDTO in user_service.get_users():
    user_service.delete_user_by_id(userDTO.id)

# drop tables (Note, the db schema has been provided to db when create_app is called)
db.drop_all()

# recreate tables
db.create_all()
