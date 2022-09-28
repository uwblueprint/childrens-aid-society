def tup_to_string_commas(l):
    """
    Convert a tuple to a string with commas between elements.
    e.g. ('a', 'b', 'c') -> "a, b, c"
    """
    return ", ".join([f"{x}" for x in l])


def tup_to_string_commas_and_quotes(l):
    """
    Convert a tuple to a string with commas between elements and single quotes around each element.
    e.g. ('a', 'b', 'c') -> "'a', 'b', 'c'"
    """
    return ", ".join([f"'{x}'" for x in l])


def create_table(db, table_name: str, creation_sql: str):
    """
    Create a table. If the table already exists, drop it and create it again.
    """
    if table_name in db.engine.table_names():
        db.engine.execute(f"DROP TABLE {table_name} CASCADE;")
    db.engine.execute(creation_sql)


def create_enum(db, enum_name: str, enum_values: tuple):
    """
    Create an enum. If the enum already exists, drop it and create it again.
    """
    if enum_name in db.engine.execute("SELECT typname FROM pg_type;").fetchall():
        db.engine.execute(f"DROP TYPE {enum_name} CASCADE;")
    db.engine.execute(
        f"CREATE TYPE {enum_name} AS ENUM ({tup_to_string_commas_and_quotes(enum_values)});"
    )


def insert_values(db, table_name: str, column_names: tuple, values: tuple):
    """
    Insert values into a table.
    """
    db.engine.execute(
        f"INSERT INTO {table_name} ({tup_to_string_commas(column_names)}) VALUES ({tup_to_string_commas_and_quotes(values)});"
    )
