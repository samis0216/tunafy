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
    playlist_song7 = PlaylistSong(
        playlist_id = 5,
        song_id = 5
    )
    playlist_song8 = PlaylistSong(
        playlist_id = 5,
        song_id = 20
    )
    playlist_song9 = PlaylistSong(
        playlist_id = 6,
        song_id = 9
    )
    playlist_song10 = PlaylistSong(
        playlist_id = 6,
        song_id = 29
    )
    playlist_song11 = PlaylistSong(
        playlist_id = 7,
        song_id = 2
    )
    playlist_song12 = PlaylistSong(
        playlist_id = 7,
        song_id = 27
    )
    playlist_song13 = PlaylistSong(
        playlist_id = 8,
        song_id = 20
    )
    playlist_song14 = PlaylistSong(
        playlist_id = 8,
        song_id = 24
    )
    playlist_song15 = PlaylistSong(
        playlist_id = 9,
        song_id = 31
    )
    playlist_song16 = PlaylistSong(
        playlist_id = 9,
        song_id = 30
    )

    db.session.add(playlist_song1)
    db.session.add(playlist_song2)
    db.session.add(playlist_song3)
    db.session.add(playlist_song4)
    db.session.add(playlist_song5)
    db.session.add(playlist_song6)
    db.session.add(playlist_song7)
    db.session.add(playlist_song8)
    db.session.add(playlist_song9)
    db.session.add(playlist_song10)
    db.session.add(playlist_song11)
    db.session.add(playlist_song12)
    db.session.add(playlist_song13)
    db.session.add(playlist_song14)
    db.session.add(playlist_song15)
    db.session.add(playlist_song16)
    db.session.commit()

def undo_playlist_songs():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM playlist_songs"))

  db.session.commit()
