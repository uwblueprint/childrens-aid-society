from . import db

intakes_concerns = db.Table(
    "intakes_concerns",
    db.metadata,
    db.Column("intake_id", db.ForeignKey('intakes.id', ondelete='CASCADE')),
    db.Column("concern_id", db.ForeignKey("familial_concerns.id")),
)
