from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import Song

class SongForm(FlaskForm):
    song_name = StringField('Song Name', validators=[DataRequired()])
    album_name = StringField('Album Name', validators=[DataRequired()])
    song_cover_url = StringField('Song Cover URL', validators=[DataRequired()])
    song_file_url = StringField('Song File URL', validators=[DataRequired()])
    duration = IntegerField('Duration', validators=[DataRequired()])
    submit = SubmitField('Add Song')

    # FileField("Song File", validators=[(FileAllowed(), FileRequired())])
