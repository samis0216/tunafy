import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LoadHomePage from '../components/HomePage/HomePage';
import CreateSong from '../components/CreateSong/CreateSong';
import CreatePlaylist from '../components/CreatePlaylist/CreatePlaylist'
import Layout from './Layout';
import CreateAlbum from '../components/CreateAlbum/CreateAlbum';

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
        element: <CreateSong />
      },
      {
        path: "albums",
        element: <CreateAlbum />
      },
      {
        path: "playlists",
        element: <CreatePlaylist />
      }
    ],
  },
]);
