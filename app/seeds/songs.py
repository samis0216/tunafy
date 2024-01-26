from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
  song1 = Song(
    song_name = 'White Iverson',
    artist_id = 1,
    album_id = 1,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/437f4e7f2e9145d2a6b9ac17b1d75f3d.mp3',
    plays = 0,
    duration = 180
  )
  song2 = Song(
    song_name = 'Modus',
    artist_id = 2,
    album_id = 2,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/1/1b/Joji_-_Nectar.png',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/423e0bc22d9e488ab3f990ca58c4552d.mp3',
    plays = 0,
    duration = 180
  )
  song3 = Song(
    song_name = 'Snooze',
    artist_id = 3,
    album_id = 3,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/2/2c/SZA_-_S.O.S.png',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/16ed5d984e804ccc97f266b348cee916.mp3',
    plays = 0,
    duration = 180
  )

  db.session.add(song1)
  db.session.add(song2)
  db.session.add(song3)
  db.session.commit()

def undo_songs():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM songs"))

  db.session.commit()
