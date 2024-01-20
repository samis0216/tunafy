from flask import Blueprint
from app.models import Song

song_routes = Blueprint('song', __name__)

@song_routes.route('/')
def songs():
    all_songs = Song.query.all()
    return {'songs': [song.to_dict() for song in all_songs]}
