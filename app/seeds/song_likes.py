from app.models import db, SongLike, environment, SCHEMA
from sqlalchemy.sql import text

def seed_song_likes():
    song_like1 = SongLike(
        user_id = 1,
        song_id = 2
    )
    song_like2 = SongLike(
        user_id = 2,
        song_id = 3
    )
    song_like3 = SongLike(
        user_id = 3,
        song_id = 1
    )

    db.session.add(song_like1)
    db.session.add(song_like2)
    db.session.add(song_like3)
    db.session.commit()

def undo_song_likes():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.song_likes RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM song_likes"))

  db.session.commit()
