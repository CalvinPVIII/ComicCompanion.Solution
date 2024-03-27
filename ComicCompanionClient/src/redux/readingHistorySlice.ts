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
  completed: boolean;
};

export interface ReadingListHistoryIssue {
  comicId: string;
  issueId: string;
  coverImg: string;
  pagesRead: number;
  completed: boolean;
}

interface ReadingListHistoryIssueAction extends ReadingListHistoryIssue {
  listId: string;
}

export interface ReadingListHistoryItem {
  name: string;
  listId: string | number;
  coverImg: string;
  readIssues: { [comicIdAndIssueId: string]: ReadingListHistoryIssue };
}

interface DeleteIssueFromReadingListHistoryAction {
  comicAndIssueId: string;
  listId: string;
}

export interface ReadingHistoryState {
  history: { [comicId: string]: { [issueId: string]: HistoryItem } };
  paused: boolean;
  currentPlaylist: Issue[];
  previousPage: string;
  readingListHistory: { [readingListId: string]: ReadingListHistoryItem };
}

const initialState: ReadingHistoryState = { history: {}, paused: false, currentPlaylist: [], previousPage: "", readingListHistory: {} };

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

    createReadingListHistoryItem: (state, action: PayloadAction<ReadingListHistoryItem>) => {
      state.readingListHistory[action.payload.listId] = action.payload;
    },

    updateReadingListHistory: (state, action: PayloadAction<ReadingListHistoryIssueAction>) => {
      const { listId, comicId, issueId } = action.payload;

      if (state.readingListHistory[listId]) {
        // if the issue isnt in the history then created
        if (!state.readingListHistory[listId].readIssues[comicId + issueId]) {
          state.readingListHistory[listId].readIssues[comicId + issueId] = action.payload;
        }
        // only update if the page read is greater than the page read in history
        if (state.readingListHistory[listId].readIssues[comicId + issueId].pagesRead < action.payload.pagesRead) {
          state.readingListHistory[listId].readIssues[comicId + issueId] = action.payload;
        }
      }
    },
    deleteIssueFromReadingListHistory: (state, action: PayloadAction<DeleteIssueFromReadingListHistoryAction>) => {
      delete state.readingListHistory[action.payload.listId].readIssues[action.payload.comicAndIssueId];
    },
    deleteReadingListFromHistory: (state, action: PayloadAction<string>) => {
      delete state.readingListHistory[action.payload];
    },
  },
});

export const {
  updateHistory,
  removeComicFromHistory,
  removeIssueFromHistory,
  togglePauseHistory,
  setPlaylist,
  setPreviousPage,
  updateReadingListHistory,
  deleteIssueFromReadingListHistory,
  deleteReadingListFromHistory,
  createReadingListHistoryItem,
} = readingHistorySlice.actions;

export default readingHistorySlice.reducer;
