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
  play5 = Playlist(
    playlist_name = 'Discover Weekly',
    creator_id = 1,
    playlist_cover_url = 'https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/3YiKOcTBbEKL-RUk1qnTyGC3GfgyLaJ3dQvqr3YZsV6gY5RCvA4pm6r0CLozXF3gtT5N_sthyvml_wqmwYq0k51YyYBzDqki1V20sY4CZFw=/NjU6ODQ6MzJUMjAtMjAtNA==',
    description = 'Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you.',
    private = False
  )
  play6 = Playlist(
    playlist_name = 'Good Vibes',
    creator_id = 2,
    playlist_cover_url = 'https://i.scdn.co/image/ab67706f00000002ed91f72d69d10c9805cf25b3',
    description = 'Just good vibes all day long',
    private = False
  )
  play7 = Playlist(
    playlist_name = 'In My Feels',
    creator_id = 3,
    playlist_cover_url = 'https://i.pinimg.com/236x/7e/c3/e0/7ec3e08010a3b1edbbb4531ef04d2d95.jpg',
    description = 'Just got my heart broken and I wanna feel something again',
    private = False
  )
  play8 = Playlist(
    playlist_name = 'Songs for Coding',
    creator_id = 4,
    playlist_cover_url = 'https://pbs.twimg.com/media/FgfRWcSVsAEi6y2.jpg',
    description = 'Time to code!',
    private = False
  )
  play9 = Playlist(
    playlist_name = 'Party Time',
    creator_id = 5,
    playlist_cover_url = 'https://external-preview.redd.it/party-best-party-rock-anthems-v0-Nv7a6jhMIoIRl2KtUHq59Bo0PGCPKGoKkmsqNY-Zz6k.jpg?auto=webp&s=8b81dad76101ff03c02c513a88310705373961d2',
    description = 'Lets get white girl wasted',
    private = False
  )

  db.session.add(play1)
  db.session.add(play2)
  db.session.add(play3)
  db.session.add(play4)
  db.session.add(play5)
  db.session.add(play6)
  db.session.add(play7)
  db.session.add(play8)
  db.session.add(play9)
  db.session.commit()

def undo_playlists():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM playlists"))

  db.session.commit()
