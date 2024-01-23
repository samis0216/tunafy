from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import Album
from app.api.aws_images import IMAGES_ALLOWED_EXTENSIONS

class AlbumForm(FlaskForm):
    album_name = StringField("Album Name", validators=[DataRequired()])
    album_cover_url = FileField("Album Cover URL",validators=[FileAllowed(list(IMAGES_ALLOWED_EXTENSIONS)), FileRequired()])
    submit = SubmitField("Add Album")
