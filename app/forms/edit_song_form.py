from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from app.models import Song
from app.api.aws_images import IMAGES_ALLOWED_EXTENSIONS
from app.api.aws_songs import SONGS_ALLOWED_EXTENSIONS

class EditSongForm(FlaskForm):
    song_name = StringField('Song Name', validators=[DataRequired()])
    artist_id = IntegerField('Artist Id', validators=[DataRequired()])
    song_cover_url = FileField('Song Cover URL', validators=[FileAllowed(list(IMAGES_ALLOWED_EXTENSIONS))])
    song_file_url = FileField('Song File URL', validators=[FileAllowed(list(SONGS_ALLOWED_EXTENSIONS))])
    duration = IntegerField('Duration', validators=[DataRequired()])
    submit = SubmitField('Add Song')
