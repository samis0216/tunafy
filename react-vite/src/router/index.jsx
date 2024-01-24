import { Outlet, createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LoadHomePage from '../components/HomePage/HomePage';
import CreateSong from '../components/CreateSong/CreateSong';
import CreatePlaylist from '../components/CreatePlaylist/CreatePlaylist'
import Layout from './Layout';
import CreateAlbum from '../components/CreateAlbum/CreateAlbum';
import AllPlaylists from '../components/AllPlaylists/AllPlaylists';
import AllSongs from '../components/AllSongs/AllSongs';
import AllAlbums from '../components/AllAlbums/AllAlbums';

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
        element: <>
            <AllSongs />
          <Outlet />
        </>,
        children: [,
          // {
          //   path: ":songId",
          //   element: <SongDetails />
          // },
          // {
          //   path: ":songId/update",
          //   element: <UpdateSong />
          // },
        ]
      },
      {
        path: "songs/new",
        element: <CreateSong />
      }
      // {
      //   path: "albums",
      //   element: <AllAlbums />,
      //   children:[
      //       {
      //       path: "new",
      //       element: <CreateAlbum />
      //       },
          // {
          //   path: ":albumId",
          //   element: <AlbumDetails />
          // },
          // {
          //   path: ":albumId/update",
          //   element: <UpdateAlbum />
          // }
      //   ]
      // },
      // {
      //   path: "playlists",
      //   element: <AllPlaylists />,
      //   children: [
      //     {
      //       path: "new",
      //       element: <CreatePlaylist />
      //       },
          // {
          //   path: ":playlistId",
          //   element: <PlaylistDetails />
          // },
        // ]
      // },
      // {
      //   path: "collection/tracks",
      //   element: <LikedSongs />
      // }
    ],
  },
]);
