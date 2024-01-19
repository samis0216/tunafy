from app.models import db, PlaylistSong, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist_songs():
    playlist_song1 = PlaylistSong(
        playlist_id = 1,
        song_id = 1
    )
    playlist_song2 = PlaylistSong(
        playlist_id = 2,
        song_id = 2
    )
    playlist_song3 = PlaylistSong(
        playlist_id = 3,
        song_id = 3
    )
    playlist_song4 = PlaylistSong(
        playlist_id = 1,
        song_id = 2
    )
    playlist_song5 = PlaylistSong(
        playlist_id = 2,
        song_id = 3
    )
    playlist_song6 = PlaylistSong(
        playlist_id = 3,
        song_id = 1
    )

    db.session.add(playlist_song1)
    db.session.add(playlist_song2)
    db.session.add(playlist_song3)
    db.session.add(playlist_song4)
    db.session.add(playlist_song5)
    db.session.add(playlist_song6)
    db.session.commit()

def undo_playlist_songs():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM playlist_songs"))

  db.session.commit()
