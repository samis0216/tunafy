import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LoadHomePage from '../components/HomePage/HomePage';
import CreateSong from '../components/CreateSong/CreateSong';
import CreatePlaylist from '../components/CreatePlaylist/CreatePlaylist'
import Layout from './Layout';
import CreateAlbum from '../components/CreateAlbum/CreateAlbum';
import AllPlaylists from '../components/AllPlaylists/AllPlaylists';
import AllAlbums from '../components/AllAlbums/AllAlbums'
import AllSongs from '../components/AllSongs/AllSongs';
import AlbumDetails from '../components/AlbumDetails/AlbumDetails'
import PlaylistDetails from '../components/PlaylistDetails/PlaylistDetails';
import UpdateAlbum from '../components/UpdateAlbum/UpdateAlbum';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoadHomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "songs",
        element: <AllSongs />,
      },
      {
        path: "songs/new",
        element: <CreateSong />
      },
      {
        path: "songs/:songId",
        element: <AllSongs/>
      },
      {
        path: "songs/:songId/update",
        element: <AllSongs />
      },
      {
        path: "albums",
        element: <AllAlbums />,
      },
      {
        path: "albums/new",
        element: <CreateAlbum />
      },
      {
        path: "albums/:albumId",
        element: <AlbumDetails />
      },
      {
        path: "albums/:albumId/update",
        element: <UpdateAlbum />
      },
      {
        path: "playlists",
        element: <AllPlaylists />,
      },
      {
        path: "playlists/new",
        element: <CreatePlaylist />
      },
      {
        path: "playlists/:playlistId",
        element: <PlaylistDetails />
      },
      // {
      //   path: "collection/tracks",
      //   element: <LikedSongs />
      // }
    ],
  },
]);
