from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):
    __tablename__="songs"
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(23), nullable=False)
    artist_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cover_url=db.Column(db.String, nullable=False)
    plays=db.Column(db.Integer, nullable=False, default=0)
    duration=db.Column(db.Integer, nullable=False)
