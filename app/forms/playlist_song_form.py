from flask_wtf import FlaskForm
from wtforms import SelectField, IntegerField
from wtforms.validators import DataRequired

class PlaylistSongForm(FlaskForm):
  playlist_id = SelectField("Playlist", coerce=int, validators=[DataRequired()])
  song_id = IntegerField("Song", validators=[DataRequired()])
