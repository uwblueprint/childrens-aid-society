# 🧸 Children's Aid Society - Algoma

🐘 Postgres + 🐍 Flask + React supervised access program admin platform.

Made with [starter-code-v2](https://github.com/uwblueprint/starter-code-v2), brought to you by the @uwblueprint/internal-tools team!

# Getting Started

## Environment Variables

Confirm that you have the following files added to your repository, with the correct environment variables set:

```
.env
frontend/.env
e2e-tests/.env
```

## Prereqs

Verify that you have docker and npx installed:

```
docker info
docker-compose --version
npx -v
```

# Build and Run

Note: if you have already built the project before, run this to remove your database and any stored data as well:

```
docker-compose down --volumes
```

To run the project:

```
docker-compose up
```

To rebuild the containers with any newly added packages, run:

```
docker-compose up --build
```

To run the existing migrations against your database, run:

```
docker exec -it cas_py_backend /bin/bash -c "flask db upgrade"
```

# Lint

Be sure to lint your code prior to opening pull requests! To lint the backend, run:

```
docker exec -it cas_py_backend /bin/bash -c "black . && isort --profile black ."
```

# Running Tests

To test your backend, run:

```
docker exec -it cas_py_backend /bin/bash -c "pip install -e . && pytest"
```

Alternatively, inside the backend container you can run:

```
python -m pytest
```

To run E2E tests, first create a `.env` file in your `e2e-tests` directory, and populate it with the necessary variables. Then run:

```
$ pip3 install pytest python-dotenv inflection --user
$ cd e2e-tests
$ python3 -m pytest --lang python --auth --fs
```

## Generating Test Coverage Report

To generate a test coverage report, run:
```
 docker exec -it cas_py_backend /bin/bash -c "./tests/coverage.sh"
```

# Database + Migrations

## Access the Database

To access the database:

```
docker exec -it cas_db /bin/bash -c "psql -U postgres -d cas"
```

## Migrations

We are currently maintaining our database with Flask-Migrate. To apply existing migrations, run:

```
docker exec -it cas_py_backend /bin/bash -c "flask db upgrade"
```

To roll back the previous migration, run:

```
docker exec -it cas_py_backend /bin/bash -c "flask db downgrade"
```

To undo all migrations, run:

```
docker exec -it cas_py_backend /bin/bash -c "flask db downgrade base"
```

When making database changes, a new migration must be generated. Import any new model files into [backend/python/app/models/\_\_init\_\_.py](backend/python/app/models/__init__.py) and run:

```
docker exec -it cas_py_backend /bin/bash -c "flask db migrate -m '<short description of the migration>'"
```

To check the migration currently applied to your database, run:

```
docker exec -it cas_py_backend /bin/bash -c "flask db current -v"
```

Ensure that a new revision file is created in the directory [backend/python/migrations/versions](backend/python/migrations/versions). **Do not** change the alembic revision/identifiers. Generally these auto-generated revision files will encompass all schema changes, and thus do not need to be modified!

# Other

For more information, take a look at the Starter Code [getting started](https://uwblueprint.github.io/starter-code-v2/docs/getting-started) docs.
