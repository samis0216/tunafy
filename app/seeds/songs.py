from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
  song1 = Song(
    song_name = 'White Iverson',
    artist_id = 1,
    album_id = 1,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/Post+Malone+-+White+Iverson.mp3',
    plays = 0,
    duration = 180
  )
  song2 = Song(
    song_name = 'Modus',
    artist_id = 2,
    album_id = 2,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/1/1b/Joji_-_Nectar.png',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/Joji+-+MODUS.mp3',
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
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/ce1886b719ff4153b6776fe3f5cd731d.mp3',
    plays = 56433020,
    duration = 237
  )
  song5 = Song(
    song_name = 'Feticeira',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/1b14e11d9a47427ea86976730bb82a00.mp3',
    plays = 21388798,
    duration = 187
  )
  song6 = Song(
    song_name = 'Digital Bath',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/b988296694a04819ac53fd6aea693132.mp3',
    plays = 97587985,
    duration = 255
  )
  song7 = Song(
    song_name = 'Elite',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/43120d4c664e41fd92e46d3f015d5b02.mp3',
    plays = 18594848,
    duration = 241
  )
  song8 = Song(
    song_name = 'Rx Queen',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/6e5719e2ff58404cb04b5dc258bae78d.mp3',
    plays = 31142750,
    duration = 268
  )
  song9 = Song(
    song_name = 'Street Carp',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/279d02fc1ff64f0aae252ad2a21910a4.mp3',
    plays = 15347117,
    duration = 161
  )
  song10 = Song(
    song_name = 'Teenager',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/82974c1ac6bf40a09ccbd95327fa9020.mp3',
    plays = 14409108,
    duration = 200
  )
  song11 = Song(
    song_name = 'Knife Prty',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/d3f794778f7146cda7f2dbf316174de2.mp3',
    plays = 47667429,
    duration = 289
  )
  song12 = Song(
    song_name = 'Korea',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/74149362721b4ddb930a4bfde80f870a.mp3',
    plays = 16454792,
    duration = 203
  )
  song13 = Song(
    song_name = 'Passenger',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/b555c215795f4072b3b9190396f1d496.mp3',
    plays = 90753025,
    duration = 368
  )
  song14 = Song(
    song_name = 'Change (In the House of Flies)',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/3af72ec9fcdc46eaaa85d8f612c8d39f.mp3',
    plays = 343290777,
    duration = 299
  )
  song15 = Song(
    song_name = 'Pink Maggit',
    artist_id = 3,
    album_id = 4,
    song_cover_url = 'https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/ad83fa565e8d4c48a82fa9269cd2635c.mp3',
    plays = 18214543,
    duration = 453
  )
  song16 = Song(
    song_name = 'Theme',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/d31d93b1bb1f4cc894245e8df7449714.mp3',
    plays = 2665372,
    duration = 83
  )
  song17 = Song(
    song_name = 'Aggressive Evolution',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/371241cb7d2a46088e3190743859f129.mp3',
    plays = 7773687,
    duration = 207
  )
  song18 = Song(
    song_name = 'Broken Vision Rhythm',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/baa225521bb4497db93c2d426d3f44dd.mp3',
    plays = 3353764,
    duration = 155
  )
  song19 = Song(
    song_name = 'Two-Way Mirror',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/dba56b493cda4700998259bcbea966db.mp3',
    plays = 18407706,
    duration = 300
  )
  song20 = Song(
    song_name = '451 Days',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/a6cb607fdff14e28b6126c865d6e8548.mp3',
    plays = 2462491,
    duration = 207
  )
  song21 = Song(
    song_name = 'New Faces in the Dark',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/0abc7483df234554b48611dd04e5ec40.mp3',
    plays = 6747147,
    duration = 192
  )
  song22 = Song(
    song_name = 'Red Room',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/d6644f2f9f4d4be783df78a3838e9dd6.mp3',
    plays = 2150181,
    duration = 123
  )
  song23 = Song(
    song_name = 'Screaming',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/d35ada0715f0413daa2f01f351ed0083.mp3',
    plays = 14977935,
    duration = 354
  )
  song24 = Song(
    song_name = 'Is It Really You?',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/b30a0b27b3af42c490b73ab376fc6bc6.mp3',
    plays = 32306452,
    duration = 287
  )
  song25 = Song(
    song_name = 'Gored',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/fa8521af8afe4664b631a6d8972bd79d.mp3',
    plays = 4486788,
    duration = 187
  )
  song26 = Song(
    song_name = 'Heavy Is the Head That Falls with the Weight of a Thousand Thoughts',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/4a18e1354a79483b8ebcb17fe4120e1b.mp3',
    plays = 2702941,
    duration = 257
  )
  song27 = Song(
    song_name = 'A Sad Cartoon',
    artist_id = 3,
    album_id = 5,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/0/08/I_Let_It_in_and_It_Took_Everything.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/572ff7bb13874005be08390b04186ba6.mp3',
    plays = 11626390,
    duration = 315
  )
  song28 = Song(
    song_name = "Eve, Psyche & The Bluebeard's Wife",
    artist_id = 4,
    album_id = 6,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/9/9b/Le_Sserafim_-_Unforgiven.png',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/LE+SSERAFIM+-+Eve%2C+Psyche+%26+The+Bluebeard%E2%80%99s+wife.mp3',
    plays = 11626390,
    duration = 185
  )
  song29 = Song(
    song_name = "UNFORGIVEN",
    artist_id = 4,
    album_id = 6,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/9/9b/Le_Sserafim_-_Unforgiven.png',
    song_file_url = "http://tunafy-music.s3.amazonaws.com/d8eaefd77899467c9ae7d96ab2cb30f3.mp3",
    plays = 11626390,
    duration = 168
  )
  song30 = Song(
    song_name = "FEARLESS",
    artist_id = 4,
    album_id = 6,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/9/9b/Le_Sserafim_-_Unforgiven.png',
    song_file_url = 'http://tunafy-music.s3.amazonaws.com/70972b7f5cfa4d139f95f96bf5303117.mp3',
    plays = 11626390,
    duration = 182
  )
  song31 = Song(
    song_name = "Flash Forward",
    artist_id = 4,
    album_id = 6,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/9/9b/Le_Sserafim_-_Unforgiven.png',
    song_file_url = "http://tunafy-music.s3.amazonaws.com/bc1282f11b1e40318f9274abea350bc9.mp3",
    plays = 11626390,
    duration = 195
  )
  song32 = Song(
    song_name = "Blue Flame",
    artist_id = 4,
    album_id = 6,
    song_cover_url = 'https://upload.wikimedia.org/wikipedia/en/9/9b/Le_Sserafim_-_Unforgiven.png',
    song_file_url = "http://tunafy-music.s3.amazonaws.com/82c7256df0664d0498444903cab64e3c.mp3",
    plays = 11626390,
    duration = 201
  )
  song33 = Song(
    song_name = 'REWiND',
    artist_id = 5,
    album_id = 7,
    song_cover_url = 'https://e.snmc.io/i/600/s/3f700cfd13c410cf4d54931180ccc788/10650803/knock2-room202-ep-Cover-Art.jpg',
    song_file_url = 'https://tunafy-music.s3.us-west-1.amazonaws.com/Knock2+-+REWiND.mp3',
    plays = 11626390,
    duration = 184
  )

  songs = [
    song1,
    song2,
    song3,
    song4,
    song5,
    song6,
    song7,
    song8,
    song9,
    song10,
    song11,
    song12,
    song13,
    song14,
    song15,
    song16,
    song17,
    song18,
    song19,
    song20,
    song21,
    song22,
    song23,
    song24,
    song25,
    song26,
    song27,
    song28,
    song29,
    song31,
    song32,
    song33
  ]

  for song in songs:
    db.session.add(song)
  db.session.commit()

def undo_songs():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM songs"))

  db.session.commit()
