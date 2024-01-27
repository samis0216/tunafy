from flask import Blueprint
from app.models import SongLike, Song

collection_routes = Blueprint('collection', __name__)

@collection_routes.route('/<int:id>/tracks')
def likedSongs(id):
    all_songs = SongLike.query.filter(SongLike.user_id == id).all()
    songsId = [song.to_dict()["song_id"] for song in all_songs]
    songs = [Song.query.get(songId).to_dict() for songId in songsId]
    return songs
