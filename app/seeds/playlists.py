from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
  play1 = Playlist(
    playlist_name = 'Throwbacks',
    creator_id = 1,
    playlist_cover_url = 'https://i.scdn.co/image/ab67706c0000da84da55bc5f13f4cde15ba863a3',
    description = 'The songs with the biggest throwback moments.',
    private = True
  )
  play2 = Playlist(
    playlist_name = 'Lofi',
    creator_id = 2,
    playlist_cover_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn4koIpzmiHezsGhmLyxUlwJXq6lMUUUmrGQ&usqp=CAU',
    description = 'Best lo-fi versions and remixes of famous pop, hip-hop, and R&B music.',
    private = False
  )
  play3 = Playlist(
    playlist_name = 'Hot Hits',
    creator_id = 3,
    playlist_cover_url = 'https://i.scdn.co/image/ab67616d0000b27328ae9a159d24cb0ab2552712',
    description = 'The hottest tracks in the United States.',
    private = False
  )
  play4 = Playlist(
    playlist_name = 'Mood Booster',
    creator_id = 1,
    playlist_cover_url = 'https://i.scdn.co/image/ab67706f00000002bd0e19e810bb4b55ab164a95',
    private = True
  )

  db.session.add(play1)
  db.session.add(play2)
  db.session.add(play3)
  db.session.add(play4)
  db.session.commit()

def undo_playlists():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM playlists"))

  db.session.commit()
