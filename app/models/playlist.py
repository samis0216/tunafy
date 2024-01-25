from .db import db, environment, SCHEMA, add_prefix_for_prod

class Playlist(db.Model):
    __tablename__ = "playlists"

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_name = db.Column(db.String(30), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    playlist_cover_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    private = db.Column(db.Boolean, default=False, nullable=False)

    playlist_song = db.relationship('PlaylistSong', back_populates='playlist')

    def to_dict(self):
       return {
          'id': self.id,
          'playlist_name': self.playlist_name,
          'creator_id': self.creator_id,
          'playlist_cover_url': self.playlist_cover_url,
          'description': self.description,
          'private': self.private
       }
