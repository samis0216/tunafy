from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_images import IMAGES_ALLOWED_EXTENSIONS

class PlaylistForm(FlaskForm):
    playlist_name = StringField("Playlist Name", validators=[DataRequired()])
    creator_id = IntegerField("Creator Id", validators=[DataRequired()])
    playlist_cover_url = FileField("Playlist Cover URL", validators=[FileAllowed(list(IMAGES_ALLOWED_EXTENSIONS)), FileRequired()])
    description = StringField('Description')
    private= BooleanField("Private")
    submit = SubmitField("Add Playlist")
