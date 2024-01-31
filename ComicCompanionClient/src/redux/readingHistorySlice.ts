import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Issue } from "../types";

type HistoryItem = {
  issue: Issue;
  pagesRead: number;
};

export interface ReadingHistoryState {
  history: HistoryItem[];
  paused: boolean;
  currentPlaylist: Issue[];
  previousPage: string;
}

const initialState: ReadingHistoryState = { history: [], paused: false, currentPlaylist: [], previousPage: "" };

const readingHistorySlice = createSlice({
  name: "readingHistory",
  initialState,
  reducers: {
    updateHistory: (state, action: PayloadAction<HistoryItem>) => {
      const itemIndex = state.history.findIndex(
        (item) => item.issue.issueId + item.issue.comicId === action.payload.issue.issueId + action.payload.issue.comicId
      );
      if (itemIndex !== -1) {
        state.history[itemIndex] = action.payload;
      } else {
        state.history.push(action.payload);
      }

      return state;
    },
    removeFromHistory: (state, action: PayloadAction<Issue>) => {
      const newHistory = state.history.filter((item) => item.issue.issueId + item.issue.comicId === action.payload.issueId + action.payload.comicId);
      state.history = newHistory;
    },
    togglePauseHistory: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<Issue[]>) => {
      state.currentPlaylist = action.payload;
    },
    setPreviousPage: (state, action: PayloadAction<string>) => {
      state.previousPage = action.payload;
    },
  },
});

export const { updateHistory, removeFromHistory, togglePauseHistory, setPlaylist, setPreviousPage } = readingHistorySlice.actions;

export default readingHistorySlice.reducer;
