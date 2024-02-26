from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from app.models import Album
from app.api.aws_images import IMAGES_ALLOWED_EXTENSIONS

class EditAlbumForm(FlaskForm):
    album_name = StringField("Album Name", validators=[DataRequired()])
    artist_id = IntegerField('Artist Id', validators=[DataRequired()])
    album_cover_url = FileField("Album Cover URL",validators=[FileAllowed(list(IMAGES_ALLOWED_EXTENSIONS))])
    submit = SubmitField("Add Album")
