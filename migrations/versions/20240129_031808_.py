"""empty message

Revision ID: fb4ec4cd4b03
Revises:
Create Date: 2024-01-29 03:18:08.543005

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'fb4ec4cd4b03'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('albums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('album_name', sa.String(length=45), nullable=False),
    sa.Column('artist_id', sa.Integer(), nullable=False),
    sa.Column('album_cover_url', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['artist_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('playlist_name', sa.String(length=30), nullable=False),
    sa.Column('creator_id', sa.Integer(), nullable=False),
    sa.Column('playlist_cover_url', sa.String(), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('private', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('song_name', sa.String(length=30), nullable=False),
    sa.Column('artist_id', sa.Integer(), nullable=True),
    sa.Column('album_id', sa.Integer(), nullable=True),
    sa.Column('song_cover_url', sa.String(), nullable=False),
    sa.Column('song_file_url', sa.String(), nullable=False),
    sa.Column('plays', sa.Integer(), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['album_id'], ['albums.id'], ),
    sa.ForeignKeyConstraint(['artist_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('playlist_id', sa.Integer(), nullable=True),
    sa.Column('song_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['song_id'], ['songs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('song_likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('song_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['song_id'], ['songs.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE albums SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE playlists SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE songs SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE playlist_songs SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE song_likes SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('song_likes')
    op.drop_table('playlist_songs')
    op.drop_table('songs')
    op.drop_table('playlists')
    op.drop_table('albums')
    op.drop_table('users')
    # ### end Alembic commands ###
