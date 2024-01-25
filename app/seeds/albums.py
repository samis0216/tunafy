from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

# Adds seed data for albums
def seed_albums():
  album1 = Album(
    album_name = 'Stoney',
    artist_id = 1,
    album_cover_url = 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg'
  )
  album2 = Album(
    album_name = 'Nectar',
    artist_id = 2,
    album_cover_url = 'https://upload.wikimedia.org/wikipedia/en/1/1b/Joji_-_Nectar.png'
  )
  album3 = Album(
    album_name = 'SOS',
    artist_id = 3,
    album_cover_url = 'https://upload.wikimedia.org/wikipedia/en/2/2c/SZA_-_S.O.S.png'
  )

  db.session.add(album1)
  db.session.add(album2)
  db.session.add(album3)
  db.session.commit()

def undo_albums():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM albums"))

  db.session.commit()
