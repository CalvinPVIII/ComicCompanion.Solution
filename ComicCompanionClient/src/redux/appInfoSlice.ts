import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppInfoState {
  dontShowUpdatesFor: string[];
  seenPatchNotesFor: string[];
}

const initialState: AppInfoState = { dontShowUpdatesFor: [], seenPatchNotesFor: [] };

const appInfoSlice = createSlice({
  name: "appInfo",
  initialState,
  reducers: {
    addToSeenVersions: (state, action: PayloadAction<string>) => {
      if (!state.dontShowUpdatesFor.includes(action.payload)) {
        state.dontShowUpdatesFor.push(action.payload);
      }
    },
    toggleSeenPatchNotes: (state, action: PayloadAction<string>) => {
      state.seenPatchNotesFor.push(action.payload);
    },
  },
});

export default appInfoSlice.reducer;

export const { addToSeenVersions, toggleSeenPatchNotes } = appInfoSlice.actions;
