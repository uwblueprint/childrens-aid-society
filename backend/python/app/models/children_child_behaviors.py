from . import db

children_child_behaviors = db.Table(
    "child_join_child_behavior",
    db.metadata,
    db.Column("child_id", db.ForeignKey("children.id")),
    db.Column("child_behavior_id", db.ForeignKey("child_behaviors.id")),
)
