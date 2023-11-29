import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import readingListReducer from "./readingListReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export default configureStore({
  reducer: {
    user: persistedUserReducer,
    readingList: readingListReducer,
  },
});
