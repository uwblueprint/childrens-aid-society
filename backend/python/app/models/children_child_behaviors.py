from . import db

children_child_behaviors = db.Table(
    "children_child_behaviors",
    db.metadata,
    db.Column("child_id", db.ForeignKey("children.id")),
    db.Column("child_behavior_id", db.ForeignKey("child_behaviors.id")),
)
