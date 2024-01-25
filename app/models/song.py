from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):
    __tablename__="songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id=db.Column(db.Integer, primary_key=True)
    song_name=db.Column(db.String(30), nullable=False)
    artist_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    album_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=True)
    song_cover_url=db.Column(db.String, nullable=False)
    song_file_url=db.Column(db.String, nullable=False)
    plays=db.Column(db.Integer, nullable=False, default=0)
    duration=db.Column(db.Integer, nullable=False)

    song_playlist = db.relationship('PlaylistSong', back_populates='song')

    def to_dict(self):
        return {
            'id': self.id,
            'song_name': self.song_name,
            'artist_id': self.artist_id,
            'album_id': self.album_id,
            'song_cover_url': self.song_cover_url,
            'song_file_url': self.song_file_url,
            'plays': self.plays,
            'duration': self.duration
        }
