import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// @ts-expect-error no type declaration
import storage from "redux-persist-indexeddb-storage";

import userReducer, { UserReducerState } from "./userSlice";
import listCreationReducer, { ListCreationState } from "./listCreationSlice";
import readingHistoryReducer, { ReadingHistoryState } from "./readingHistorySlice";
import modalReducer, { ModalState } from "./modalSlice";
import alertReducer, { AlertState } from "./alertSlice";
import libraryReducer, { LibraryState } from "./librarySlice";
import apiCacheReducer, { ApiCacheState } from "./apiCacheSlice";
import createdReadingListsReducer, { CreatedReadingListsState } from "./createdReadingListsSlice";
import settingsReducer, { SettingsState } from "./settingsSlice";
import appInfoReducer, { AppInfoState } from "./appInfoSlice";
const persistConfig = {
  key: "root",
  storage: storage("comicCompanion"),
  blacklist: ["modal", "alert", "apiCache"],
};

export interface ApplicationState {
  user: UserReducerState;
  listCreation: ListCreationState;
  modal: ModalState;
  alert: AlertState;
  readingHistory: ReadingHistoryState;
  library: LibraryState;
  apiCache: ApiCacheState;
  createdReadingLists: CreatedReadingListsState;
  settings: SettingsState;
  appInfo: AppInfoState;
}

const rootReducer = combineReducers({
  user: userReducer,
  listCreation: listCreationReducer,
  modal: modalReducer,
  alert: alertReducer,
  readingHistory: readingHistoryReducer,
  library: libraryReducer,
  apiCache: apiCacheReducer,
  createdReadingLists: createdReadingListsReducer,
  settings: settingsReducer,
  appInfo: appInfoReducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
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

export const readingHistorySelector = (state: ApplicationState) => state.readingHistory;

export const currentPlaylistSelector = (state: ApplicationState) => state.readingHistory.currentPlaylist;

export const previousPageSelector = (state: ApplicationState) => state.readingHistory.previousPage;

export const librarySelector = (state: ApplicationState) => state.library;

export const popularComicsCacheSelector = (state: ApplicationState) => state.apiCache.popularComics;
export const popularReadingListsCacheSelector = (state: ApplicationState) => state.apiCache.popularReadingLists;

export const createdReadingListsSelector = (state: ApplicationState) => state.createdReadingLists;

export const settingsSelector = (state: ApplicationState) => state.settings;

export const appInfoSelector = (state: ApplicationState) => state.appInfo;
