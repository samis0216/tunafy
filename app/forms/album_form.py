from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models import Album

class AlbumForm(FlaskForm):
    album_name = StringField("Album Name", validators=[DataRequired()])
    album_cover_url = StringField("Album Cover URL", validators=[DataRequired()])
    submit = SubmitField("Add Album")
