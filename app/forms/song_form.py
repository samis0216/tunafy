from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import Song

class SongForm(FlaskForm):
    song_name = StringField('Song Name', validators=[DataRequired()])
    album_name = StringField('Album Name', validators=[DataRequired()])
    song_cover_url = FileField('Song Cover URL', validators=[DataRequired(), FileAllowed(), FileRequired()])
    song_file_url = FileField('Song File URL', validators=[DataRequired(), FileAllowed(), FileRequired()])
    duration = IntegerField('Duration', validators=[DataRequired()])
    submit = SubmitField('Add Song')

    # FileField("Song File", validators=[(FileAllowed(), FileRequired())])
