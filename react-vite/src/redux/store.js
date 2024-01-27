import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import playlistReducer from "./playlists";
import songReducer from "./songs";
import albumReducer from "./albums";
import userReducer from "./users"
import collectionReducer from './collection'

const rootReducer = combineReducers({
  session: sessionReducer,
  playlists: playlistReducer,
  songs: songReducer,
  albums: albumReducer,
  users: userReducer,
  collection: collectionReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
