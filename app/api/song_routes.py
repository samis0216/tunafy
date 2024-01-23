from flask import Blueprint, render_template, redirect
from app.models import Song, db
from app.forms.song_form import SongForm
from .aws_songs import upload_song_to_s3, get_unique_filename_songs
from .aws_images import upload_img_to_s3, get_unique_filename_img

song_routes = Blueprint('song', __name__)

@song_routes.route('/')
def songs():
    all_songs = Song.query.all()
    return {'songs': [song.to_dict() for song in all_songs]}

@song_routes.route('/new')
def index():
    form = SongForm()
    return render_template('song_form.html', form=form)

@song_routes.route('/new', methods=['GET', 'POST'])
def song_form():
    form = SongForm()
    if form.validate_on_submit():
        data = form.data
        form.song_cover_url.data.filename = get_unique_filename_img(form.song_cover_url.data.filename)
        form.song_file_url.data.filename = get_unique_filename_songs(form.song_file_url.data.filename)
        new_song = Song(song_name=data['song_name'],
                        artist_id=1,
                        song_cover_url=upload_img_to_s3(form.song_cover_url.data),
                        song_file_url=upload_song_to_s3(form.song_file_url.data),
                        duration=data['duration'])
        db.session.add(new_song)
        db.session.commit()
        return redirect('/api/songs')
    return 'Bad Data'
