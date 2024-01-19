from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
    __tablename__ = "albums"

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String(30), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    album_cover_url = db.Column(db.String, nullable=False)
