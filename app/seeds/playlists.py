from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
  play1 = Playlist(
    playlist_name = 'Throwbacks',
    creator_id = 1,
    playlist_cover_url = 'https://i.scdn.co/image/ab67706c0000da84da55bc5f13f4cde15ba863a3',
    private = True
  )
  play2 = Playlist(
    playlist_name = 'Lofi',
    creator_id = 2,
    playlist_cover_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn4koIpzmiHezsGhmLyxUlwJXq6lMUUUmrGQ&usqp=CAU',
    private = False
  )
  play3 = Playlist(
    playlist_name = 'Hot Hits',
    creator_id = 3,
    playlist_cover_url = 'https://i.scdn.co/image/ab67616d0000b27328ae9a159d24cb0ab2552712',
    private = False
  )

  db.session.add(play1)
  db.session.add(play2)
  db.session.add(play3)
  db.session.commit()

def undo_playlists():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM playlists"))

  db.session.commit()
