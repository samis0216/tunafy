from flask import Blueprint, render_template, redirect, request
from app.models import Song, SongLike, db
from app.forms.song_form import SongForm
from .aws_songs import upload_song_to_s3, get_unique_filename_songs, remove_song_from_s3
from .aws_images import upload_img_to_s3, get_unique_filename_img, remove_img_from_s3

song_routes = Blueprint('song', __name__)

@song_routes.route('/')
def songs():
    all_songs = Song.query.all()
    return {'songs': [song.to_dict() for song in all_songs]}

@song_routes.route('/<int:id>/likes')
def likedSongs(id):
    all_songs = SongLike.query.filter(SongLike.user_id == id).all()
    return {'songs': [song.to_dict() for song in all_songs]}

@song_routes.route('/new')
def index():
    form = SongForm()
    return render_template('song_form.html', form=form)

@song_routes.route('/new', methods=['GET', 'POST'])
def song_form():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        data = form.data
        form.song_cover_url.data.filename = get_unique_filename_img(form.song_cover_url.data.filename)
        form.song_file_url.data.filename = get_unique_filename_songs(form.song_file_url.data.filename)
        new_song = Song(song_name=data['song_name'],
                        artist_id=data['artist_id'],
                        song_cover_url=upload_img_to_s3(form.song_cover_url.data).get("url"),
                        song_file_url=upload_song_to_s3(form.song_file_url.data).get("url"),
                        duration=data['duration'])
        db.session.add(new_song)
        db.session.commit()
        return redirect('/api/songs')
    return 'Bad Data'

@song_routes.route("/<int:id>")
def oneSong(id):
    song = Song.query.get(id)
    return song.to_dict()

@song_routes.route("/<int:id>/update")
def editSong(id):
    song = Song.query.get(id)
    song.song_name

@song_routes.route("/<int:id>", methods=['DELETE'])
def deleteSong(id):
    song = Song.query.get(id)
    remove_img_from_s3(song["song_cover_url"])
    remove_song_from_s3(song["song_file_url"])
    db.session.delete(song)
    db.session.commit()
    return "Successfully deleted"
