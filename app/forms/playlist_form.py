from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

class PlaylistForm(FlaskForm):
    playlist_name = StringField("Playlist Name", validators=[DataRequired()])
    playlist_cover_url = FileField("Playlist Cover URL", validators=[DataRequired(), FileAllowed(), FileRequired()])
    private= BooleanField("Private")
    submit = SubmitField("Add Playlist")