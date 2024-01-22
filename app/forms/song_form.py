from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import Song
from app.api.aws_images import IMAGES_ALLOWED_EXTENSIONS
from app.api.aws_songs import SONGS_ALLOWED_EXTENSIONS

class SongForm(FlaskForm):
    song_name = StringField('Song Name', validators=[DataRequired()])
    song_cover_url = FileField('Song Cover URL')
    song_file_url = FileField('Song File URL')
    duration = IntegerField('Duration', validators=[DataRequired()])
    submit = SubmitField('Add Song')

    # FileField("Song File", validators=[(FileAllowed(), FileRequired())])
    # , validators=[FileAllowed(list(IMAGES_ALLOWED_EXTENSIONS)), FileRequired()]
    # validators=[FileAllowed(list(SONGS_ALLOWED_EXTENSIONS)), FileRequired()]
    # album_name = StringField('Album Name', validators=[DataRequired()])
