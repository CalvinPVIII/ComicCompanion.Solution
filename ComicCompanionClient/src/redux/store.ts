import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import sessionStorage from "redux-persist/es/storage/session";

import userReducer, { UserReducerState } from "./userSlice";
import listCreationReducer, { ListCreationState } from "./listCreationSlice";
import readingHistoryReducer, { ReadingHistoryState } from "./readingHistorySlice";
import modalReducer, { ModalState } from "./modalSlice";
import alertReducer, { AlertState } from "./alertSlice";
import libraryReducer, { LibraryState } from "./librarySlice";
import apiCacheReducer, { ApiCacheState } from "./apiCacheSlice";

const persistConfig = {
  key: "root",
  storage,
};

// const sessionStorageConfig = {
//   key: "root",
//   storage: sessionStorage,
// };

export interface ApplicationState {
  user: UserReducerState;
  listCreation: ListCreationState;
  modal: ModalState;
  alert: AlertState;
  readingHistory: ReadingHistoryState;
  library: LibraryState;
  apiCache: ApiCacheState;
}

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedListCreationReducer = persistReducer(persistConfig, listCreationReducer);
const persistedReadingHistoryReducer = persistReducer(persistConfig, readingHistoryReducer);
const persistedLibraryReducer = persistReducer(persistConfig, libraryReducer);
// const persistedSessionCacheReducer = persistReducer(sessionStorageConfig, apiCacheReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    listCreation: persistedListCreationReducer,
    modal: modalReducer,
    alert: alertReducer,
    readingHistory: persistedReadingHistoryReducer,
    library: persistedLibraryReducer,
    apiCache: apiCacheReducer,
  },
  devTools: true,
});

export default store;

export const persistor = persistStore(store);

export const userSelector = (state: ApplicationState) => state.user.user;

export const currentListSelector = (state: ApplicationState) => state.listCreation.currentList;

export const isCreatingSelector = (state: ApplicationState) => state.listCreation.isCreating;

export const modalOpenSelector = (state: ApplicationState) => state.modal.isOpen;
export const modalContentSelector = (state: ApplicationState) => state.modal.content;

export const alertSelector = (state: ApplicationState) => state.alert;

export const readingHistorySelector = (state: ApplicationState) => state.readingHistory.history;

export const readingHistoryStatusSelector = (state: ApplicationState) => state.readingHistory.paused;

export const currentPlaylistSelector = (state: ApplicationState) => state.readingHistory.currentPlaylist;

export const previousPageSelector = (state: ApplicationState) => state.readingHistory.previousPage;

export const librarySelector = (state: ApplicationState) => state.library;

export const popularComicsCacheSelector = (state: ApplicationState) => state.apiCache.popularComics;
export const popularReadingListsCacheSelector = (state: ApplicationState) => state.apiCache.popularReadingLists;
