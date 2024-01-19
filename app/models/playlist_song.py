from .db import db, environment, SCHEMA, add_prefix_for_prod

class PlaylistSong(db.Model):
    __tablename__ = 'playlist_songs'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=False, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False, primary_key=True)

    playlist = db.relationship('Playlist', back_populates='playlist_song')
    song = db.relationship('Song', back_populates='song_playlist')
