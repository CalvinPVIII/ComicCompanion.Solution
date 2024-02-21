import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  hideCreatedCategory: boolean;
  hideEditFAB: boolean;
  defaultLibraryPage: "reading lists" | "comics";
}

const initialState: SettingsState = {
  hideCreatedCategory: false,
  hideEditFAB: false,
  defaultLibraryPage: "comics",
};

const settingsStateSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleHideCreatedCategory: (state, action: PayloadAction<boolean>) => {
      state.hideCreatedCategory = action.payload;
    },
    toggleHideEditFab: (state, action: PayloadAction<boolean>) => {
      state.hideEditFAB = action.payload;
    },
    toggleDefaultLibraryPage: (state, action: PayloadAction<"reading lists" | "comics">) => {
      state.defaultLibraryPage = action.payload;
    },
  },
});

export default settingsStateSlice.reducer;

export const { toggleHideCreatedCategory, toggleHideEditFab, toggleDefaultLibraryPage } = settingsStateSlice.actions;
