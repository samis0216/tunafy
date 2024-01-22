from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    playlist_name = StringField("Playlist Name", validators=[DataRequired()])
    playlist_cover_url = StringField("Playlist Cover URL", validators=[DataRequired()])
    private= BooleanField("Private")
    submit = SubmitField("Add Playlist")