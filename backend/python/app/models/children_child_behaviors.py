from . import db

children_child_behaviors = db.Table(
    "children_child_behaviors",
    db.metadata,
    db.Column("child_id", db.ForeignKey("children.id")),
    db.Column("child_behavior_id", db.ForeignKey("child_behaviors.id")),
)
# child_id = db.relationship("Child")
# this is defined differently from the child one bc this is an association table
#that is used to establish establish many-to-many relatnships between the other two tables