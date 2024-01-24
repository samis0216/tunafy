import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LoadHomePage from '../components/HomePage/HomePage';
import CreateSong from '../components/CreateSong/CreateSong';
import CreatePlaylist from '../components/CreatePlaylist/CreatePlaylist'
import Layout from './Layout';
import CreateAlbum from '../components/CreateAlbum/CreateAlbum';
import AllPlaylists from '../components/AllPlaylists/AllPlaylists';
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
      // {
      //   path: "songs",
      //   element: <AllSongs />,
      //   children: [
      //     {
      //       path: "new",
      //       element: <CreateSong />
      //     },
      //     // {
      //     //   path: ":songId",
      //     //   element: <SongDetails />
      //     // },
      //     // {
      //     //   path: ":songId/update",
      //     //   element: <UpdateSong />
      //     // },
      //   ]
      // },
      {
        path: "albums",
        element: <AllAlbums />,
        children:[
            {
            path: "new",
            element: <CreateAlbum />
            }
          // {
          //   path: ":albumId",
          //   element: <AlbumDetails />
          // },
          // {
          //   path: ":albumId/update",
          //   element: <UpdateAlbum />
          // }
        ]
      },
      {
        path: "playlists",
        element: <AllPlaylists />,
          // {
          //   path: ":playlistId",
          //   element: <PlaylistDetails />
          // },

      },
      {
        path: "/playlists/new",
        element: <CreatePlaylist />
      },
      {
        path: "/albums/new",
        element: <CreateAlbum />
      },
      // {
      //   path: "collection/tracks",
      //   element: <LikedSongs />
      // }
    ],
  },
]);
