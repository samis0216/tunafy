import { useEffect, useState } from "react";
import { MusicContext } from '../context/MusicContext';
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const [songList, setSongList] = useState([])
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <MusicContext.Provider value={[songList, setSongList]}>
          <Navigation />
          {isLoaded && <Outlet />}
          <Modal />
        </ MusicContext.Provider>
      </ModalProvider>
    </>
  );
}
