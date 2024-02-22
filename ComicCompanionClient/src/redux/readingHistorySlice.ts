import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Issue } from "../types";

type HistoryIssue = {
  comicId: string;
  issueId: string;
  cover: string;
};

export type HistoryItem = {
  issue: HistoryIssue;
  pagesRead: number;
};

export interface ReadingHistoryState {
  history: { [comicId: string]: { [issueId: string]: HistoryItem } };
  paused: boolean;
  currentPlaylist: Issue[];
  previousPage: string;
}

const initialState: ReadingHistoryState = { history: {}, paused: false, currentPlaylist: [], previousPage: "" };

const readingHistorySlice = createSlice({
  name: "readingHistory",
  initialState,
  reducers: {
    updateHistory: (state, action: PayloadAction<HistoryItem>) => {
      const newHistoryState = { ...state.history };
      const { issueId, comicId } = action.payload.issue;
      if (!newHistoryState[comicId]) {
        newHistoryState[comicId] = {};
      }
      // only update the history if the payload page is greater than the history so far
      if (!(newHistoryState[comicId][issueId] && newHistoryState[comicId][issueId].pagesRead >= action.payload.pagesRead)) {
        newHistoryState[comicId][issueId] = action.payload;
      }

      state.history = newHistoryState;
    },
    removeComicFromHistory: (state, action: PayloadAction<string>) => {
      delete state.history[action.payload];
    },
    removeIssueFromHistory: (state, action: PayloadAction<HistoryIssue>) => {
      delete state.history[action.payload.comicId][action.payload.issueId];
      if (Object.values(state.history[action.payload.comicId]).length === 0) {
        delete state.history[action.payload.comicId];
      }
    },
    clearHistory: (state) => {
      state.history = {};
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

export const { updateHistory, removeComicFromHistory, removeIssueFromHistory, togglePauseHistory, setPlaylist, setPreviousPage } =
  readingHistorySlice.actions;

export default readingHistorySlice.reducer;
