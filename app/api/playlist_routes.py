from flask import Blueprint, render_template, redirect, request
from app.models import Playlist, db
from app.forms.playlist_form import PlaylistForm
from .aws_images import get_unique_filename_img, upload_img_to_s3, remove_img_from_s3


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
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        form.playlist_cover_url.data.filename=get_unique_filename_img(form.playlist_cover_url.data.filename)
        newPlaylist = Playlist(playlist_name=data['playlist_name'],
                        creator_id=1,
                        playlist_cover_url=upload_img_to_s3(form.playlist_cover_url.data).get('url'),
                        description=data['description'],
                        private=data['private'])
        db.session.add(newPlaylist)
        db.session.commit()
        return redirect('/api/playlists')
    return "Get shit on"

@playlist_routes.route('/<int:id>')
def singlePlaylist(id):
    playlist = Playlist.query.get(id)
    return playlist.to_dict()

@playlist_routes.route('/<int:id>', methods=['DELETE'])
def playlistDel(id):
    playlist = Playlist.query.get(id)
    remove_img_from_s3(playlist.playlist_cover_url)
    db.session.delete(playlist)
    db.session.commit()
