from . import db

intakes_goals = db.Table(
    "intakes_goals",
    db.metadata,
    db.Column("intake_id", db.ForeignKey("intakes.id")),
    db.Column("goal_id", db.ForeignKey("goals.id")),
    db.Column("start_date", db.String),
    db.Column("end_date", db.String),
)
