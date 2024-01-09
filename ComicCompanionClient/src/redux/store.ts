import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { UserReducerState } from "./userSlice";
import { ListCreationState } from "./listCreationSlice";

import userReducer from "./userSlice";
import listCreationReducer from "./listCreationSlice";

const persistConfig = {
  key: "root",
  storage,
};

export interface ApplicationState {
  user: UserReducerState;
  listCreation: ListCreationState;
}

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedListCreationReducer = persistReducer(persistConfig, listCreationReducer);

export default configureStore({
  reducer: {
    user: persistedUserReducer,
    listCreation: persistedListCreationReducer,
  },
});

export const userSelector = (state: ApplicationState) => state.user.user;

export const currentList = (state: ApplicationState) => state.listCreation.currentList;

export const isCreating = (state: ApplicationState) => state.listCreation.isCreating;
