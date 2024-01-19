from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):
    __tablename__="songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id=db.Column(db.Integer, primary_key=True)
    song_name=db.Column(db.String(30), nullable=False)
    artist_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    album_id=db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=True)
    playlist_id=db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=True)
    song_cover_url=db.Column(db.String, nullable=False)
    song_file_url=db.Column(db.String, nullable=False)
    plays=db.Column(db.Integer, nullable=False, default=0)
    duration=db.Column(db.Integer, nullable=False)
