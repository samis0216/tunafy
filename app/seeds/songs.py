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
  song4 = Song(
    song_name = 'Back to School (Mini Maggit)',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 56433020,
    duration = 237
  )
  song5 = Song(
    song_name = 'Feticeira',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 21388798,
    duration = 187
  )
  song6 = Song(
    song_name = 'Digital Bath',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 97587985,
    duration = 255
  )
  song7 = Song(
    song_name = 'Elite',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 18594848,
    duration = 241
  )
  song8 = Song(
    song_name = 'Rx Queen',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 31142750,
    duration = 268
  )
  song9 = Song(
    song_name = 'Street Carp',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 15347117,
    duration = 161
  )
  song10 = Song(
    song_name = 'Teenager',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 14409108,
    duration = 200
  )
  song11 = Song(
    song_name = 'Knife Prty',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 47667429,
    duration = 289
  )
  song12 = Song(
    song_name = 'Korea',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 16454792,
    duration = 203
  )
  song13 = Song(
    song_name = 'Passenger',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 90753025,
    duration = 368
  )
  song14 = Song(
    song_name = 'Change (In the House of Flies)',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 343290777,
    duration = 299
  )
  song15 = Song(
    song_name = 'Pink Maggit',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = '',
    plays = 18214543,
    duration = 453
  )
  song16 = Song(
    song_name = 'Theme',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 2665372,
    duration = 83
  )
  song17 = Song(
    song_name = 'Aggressive Evolution',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 7773687,
    duration = 207
  )
  song18 = Song(
    song_name = 'Broken Vision Rhythm',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 3353764,
    duration = 155
  )
  song19 = Song(
    song_name = 'Two-Way Mirror',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 18407706,
    duration = 300
  )
  song20 = Song(
    song_name = '451 Days',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 2462491,
    duration = 207
  )
  song21 = Song(
    song_name = 'New Faces in the Dark',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 6747147,
    duration = 192
  )
  song22 = Song(
    song_name = 'Red Room',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 2150181,
    duration = 123
  )
  song23 = Song(
    song_name = 'Screaming',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 14977935,
    duration = 354
  )
  song24 = Song(
    song_name = 'Is It Really You?',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 32306452,
    duration = 287
  )
  song25 = Song(
    song_name = 'Gored',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 4486788,
    duration = 187
  )
  song26 = Song(
    song_name = 'Heavy Is the Head That Falls with the Weight of a Thousand Thoughts',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 2702941,
    duration = 257
  )
  song27 = Song(
    song_name = 'A Sad Cartoon',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = '',
    plays = 11626390,
    duration = 315
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
