from flask import Blueprint
from app.models import Playlist

playlist_routes = Blueprint('playlist', __name__)

@playlist_routes.route('/')
def playlists():
    all_playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in all_playlists]}
# random comment for dev branch
