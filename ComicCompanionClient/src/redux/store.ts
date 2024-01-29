import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer, { UserReducerState } from "./userSlice";
import listCreationReducer, { ListCreationState } from "./listCreationSlice";
import readingHistoryReducer, { ReadingHistoryState } from "./readingHistorySlice";
import modalReducer, { ModalState } from "./modalSlice";
import alertReducer, { AlertState } from "./alertSlice";

const persistConfig = {
  key: "root",
  storage,
};

export interface ApplicationState {
  user: UserReducerState;
  listCreation: ListCreationState;
  modal: ModalState;
  alert: AlertState;
  readingHistory: ReadingHistoryState;
}

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedListCreationReducer = persistReducer(persistConfig, listCreationReducer); // not persisting?
const persistedReadingHistoryReducer = persistReducer(persistConfig, readingHistoryReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    listCreation: persistedListCreationReducer,
    modal: modalReducer,
    alert: alertReducer,
    readingHistory: persistedReadingHistoryReducer,
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

export const readingHistoryStatus = (state: ApplicationState) => state.readingHistory.paused;
