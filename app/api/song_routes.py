from flask import Blueprint, render_template, redirect, request
from app.models import Song, SongLike, db, PlaylistSong
from app.forms.song_form import SongForm
from app.forms.edit_song_form import EditSongForm
from .aws_songs import upload_song_to_s3, get_unique_filename_songs, remove_song_from_s3
from .aws_images import upload_img_to_s3, get_unique_filename_img, remove_img_from_s3
from mutagen.mp3 import MP3
import math

song_routes = Blueprint('song', __name__)

@song_routes.route('/')
def songs():
    all_songs = Song.query.all()
    return {'songs': [song.to_dict() for song in all_songs]}

@song_routes.route('/<int:id>/likes')
def likedSongs(id):
    all_songs = SongLike.query.filter(SongLike.user_id == id).all()
    return {'songs': [song.to_dict() for song in all_songs]}

@song_routes.route('/new', methods=['GET', 'POST'])
def song_form():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        data = form.data
        form.song_cover_url.data.filename = get_unique_filename_img(form.song_cover_url.data.filename)
        form.song_file_url.data.filename = get_unique_filename_songs(form.song_file_url.data.filename)
        newDuration = math.floor(MP3(form.song_file_url.data).info.length)
        print(newDuration)
        new_song = Song(song_name=data['song_name'],
                        artist_id=data['artist_id'],
                        song_cover_url=upload_img_to_s3(form.song_cover_url.data).get("url"),
                        song_file_url=upload_song_to_s3(form.song_file_url.data).get("url"),
                        duration=newDuration)
        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()
    return form.errors

@song_routes.route("/<int:id>")
def oneSong(id):
    song = Song.query.get(id)
    return song.to_dict()

@song_routes.route("/<int:id>", methods=['DELETE'])
def deleteSong(id):
    song = Song.query.get(id)
    print("MADE IT TO BACKEND")
    remove_img_from_s3(song.to_dict()["song_cover_url"])
    remove_song_from_s3(song.to_dict()["song_file_url"])
    db.session.delete(song)
    db.session.commit()
    songs = [song.to_dict() for song in Song.query.filter(Song.id != id).all()]
    return songs

@song_routes.route("/<int:id>/update", methods=['PUT'])
def editSong(id):
    form = EditSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song = Song.query.get(id)
        data = form.data
        if data['song_cover_url'] is not None:
            remove_img_from_s3(song.song_cover_url)
            form.song_cover_url.data.filename = get_unique_filename_img(form.song_cover_url.data.filename)
            song.song_cover_url=upload_img_to_s3(form.song_cover_url.data).get("url")
        if data['song_file_url'] is not None:
            remove_song_from_s3(song.song_file_url)
            form.song_file_url.data.filename = get_unique_filename_songs(form.song_file_url.data.filename)
            song.song_file_url=upload_song_to_s3(form.song_file_url.data).get("url")
            newDuration = math.floor(MP3(form.song_file_url.data).info.length)
            song.duration = newDuration
        song.song_name = data['song_name']
        song.artist_id = data['artist_id']
        db.session.commit()
        return song.to_dict()
    return 'Bad Data'
