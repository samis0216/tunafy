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
        photo = form.song_cover_url
        song = form.song_file_url
        new_song = Song(song_name=data['song_name'],
                        artist_id=1,
                        song_cover_url=get_unique_filename_img(photo.data.filename),
                        song_file_url=get_unique_filename_songs(song.data.filename),
                        duration=data['duration'])
        db.session.add(new_song)
        db.session.commit()
        photo1 = upload_img_to_s3(photo.data)
        song1 = upload_song_to_s3(song.data)
        print("SONG: ", song1, "PHOTO: ", photo1)
        return redirect('/')
    return 'Bad Data'
