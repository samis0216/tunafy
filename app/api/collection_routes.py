from flask import Blueprint, request
from app.models import SongLike, Song, db

collection_routes = Blueprint('collection', __name__)

@collection_routes.route('/<int:id>/tracks')
def likedSongs(id):
    all_songs = SongLike.query.filter(SongLike.user_id == id).all()
    songsId = [song.to_dict()["song_id"] for song in all_songs]
    songs = [Song.query.get(songId).to_dict() for songId in songsId]
    print(songs)
    return songs

@collection_routes.route('/<int:id>/new', methods=['GET', 'POST'])
def addLikeSong(id):
    data = (request.data.decode())
    songs = set([song.to_dict()['song_id'] for song in SongLike.query.filter(SongLike.user_id == id).all()])
    if int(data) in songs:
        return "Already there"
    else:
        newLike = SongLike(user_id=id,
                            song_id=data
        )
        db.session.add(newLike)
        db.session.commit()
        song = Song.query.get(int(data))
        return song.to_dict()

@collection_routes.route('/<int:id>/delete', methods=['DELETE'])
def removeLikeSong(id):
    data = request.data.decode()
    songs = [song for song in SongLike.query.filter(SongLike.user_id == id, SongLike.song_id == data).all()][0]
    song = SongLike.query.get(songs.id)
    db.session.delete(song)
    db.session.commit()
    return "Cool"
