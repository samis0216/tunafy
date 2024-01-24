import './SongTile.css'

export default function SongTile({song, artist}) {
    // const minutes =
    return (
        <div className="song-tile">
            <p>{song.id}</p>
            <img src={song.song_cover_url} className='album-picture-small' />
            <div>
                <p>{song.song_name}</p>
                <p>{artist}</p>
            </div>

        </div>
    )
}
