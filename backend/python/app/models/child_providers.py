from . import db

child_providers = db.Table(
    "child_providers",
    db.metadata,
    db.Column("child_id", db.ForeignKey("children.id")),
    db.Column("providers_id", db.ForeignKey("providers.id")),
)
