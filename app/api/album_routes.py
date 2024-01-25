from flask import Blueprint, render_template, redirect, request
from app.models import Album, db
from app.forms.album_form import AlbumForm
from .aws_images import upload_img_to_s3, get_unique_filename_img, remove_img_from_s3

album_routes = Blueprint('album', __name__)

@album_routes.route('/')
def albums():
    all_albums = Album.query.all()
    return {'albums': [album.to_dict() for album in all_albums]}

@album_routes.route('/new', methods=["GET"])
def albumNew():
    form = AlbumForm()
    return render_template("album_form.html", form=form)

@album_routes.route('/new', methods=["POST"])
def albumSub():
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        form.album_cover_url.data.filename = get_unique_filename_img(form.album_cover_url.data.filename)
        newAlbum = Album(album_name=data['album_name'],
                        artist_id=1,
                        album_cover_url=upload_img_to_s3(form.album_cover_url.data).get('url'))
        db.session.add(newAlbum)
        db.session.commit()
        return redirect('/api/albums')
    return "Get shit on"

@album_routes.route('/<int:id>')
def singleAlbum(id):
    album = Album.query.get(id)
    return album.to_dict()

@album_routes.route('/<int:id>', methods=["DELETE"])
def albumDel(id):
    album = Album.query.get(id)
    remove_img_from_s3(album['album_cover_url'])
    db.session.delete(album)
    db.session.commit()
    return "Successfully Deleted"
