from flask import Blueprint, render_template, redirect
from app.models import Playlist, db
from app.forms.playlist_form import PlaylistForm
from .aws_images import get_unique_filename_img, upload_img_to_s3


playlist_routes = Blueprint('playlist', __name__)

@playlist_routes.route('/')
def playlists():
    all_playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in all_playlists]}
# random comment for dev branch

@playlist_routes.route('/new', methods=["GET"])
def playlistNew():
    form = PlaylistForm()
    return render_template("playlist_form.html", form=form)

@playlist_routes.route('/new', methods=["POST"])
def playlistSub():
    form = PlaylistForm()
    if form.validate_on_submit():
        data = form.data
        form.playlist_cover_url.data.filename=get_unique_filename_img(form.playlist_cover_url.data.filename)
        newPlaylist = Playlist(playlist_name=data['playlist_name'],
                        creator_id=1,
                        private=data['private'],
                        playlist_cover_url=upload_img_to_s3(form.playlist_cover_url.data))
        db.session.add(newPlaylist)
        db.session.commit()
        return redirect("/api/playlists")
    return "Get shit on"
