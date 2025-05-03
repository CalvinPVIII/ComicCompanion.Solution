import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chapter } from "../types";

export interface HistoryItem {
  historyItemName: string;
  historyItemId: string;
  img?: string;
  issuesRead: {
    [issueId: string]: {
      pagesRead: number;
      completed: boolean;
      issueImg?: string;
      issueName: string;
    };
  };
}
interface AddToHistoryAction {
  addToReadingList: boolean;
  item: HistoryItem;
}

interface UpdateHistoryAction {
  historyItemId: string;
  issueId: string;
  pagesRead: number;
  completed: boolean;
  isReadingListItem: boolean;
}

interface DeleteHistoryIssueAction {
  isReadingListItem: boolean;
  itemId: string;
  issueId: string;
}

interface DeleteHistoryItemAction {
  isReadingListItem: boolean;
  itemId: string;
}

// interface BulkAddIIssuesToHistoryAction {
//   isReadingListItem: boolean;
//   itemId: string;
//   issues: HistoryItem;
// }

export interface HistoryItems {
  [historyItemId: string]: HistoryItem;
}

export interface ReadingHistoryState {
  comicHistory: HistoryItems;
  readingListHistory: HistoryItems;
  paused: boolean;
  currentPlaylist: Chapter[];
  previousPage: string;
}

const initialState: ReadingHistoryState = { comicHistory: {}, readingListHistory: {}, paused: false, currentPlaylist: [], previousPage: "" };
const readingHistorySlice = createSlice({
  name: "readingHistory",
  initialState,
  reducers: {
    togglePauseHistory: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<Chapter[]>) => {
      state.currentPlaylist = action.payload;
    },
    setPreviousPage: (state, action: PayloadAction<string>) => {
      state.previousPage = action.payload;
    },
    addItemToHistory: (state, action: PayloadAction<AddToHistoryAction>) => {
      if (action.payload.addToReadingList) {
        state.readingListHistory[action.payload.item.historyItemId] = action.payload.item;
      } else {
        state.comicHistory[action.payload.item.historyItemId] = action.payload.item;
      }
    },
    updateHistoryItem: (state, action: PayloadAction<UpdateHistoryAction>) => {
      const item = action.payload.isReadingListItem
        ? state.readingListHistory[action.payload.historyItemId]?.issuesRead[action.payload.issueId]
        : state.comicHistory[action.payload.historyItemId]?.issuesRead[action.payload.issueId];

      if (item) {
        item.pagesRead = action.payload.pagesRead;
        if (action.payload.completed) {
          item.completed = true;
        }
      }
    },

    deleteHistoryIssue: (state, action: PayloadAction<DeleteHistoryIssueAction>) => {
      if (action.payload.isReadingListItem) {
        delete state.readingListHistory[action.payload.itemId]?.issuesRead[action.payload.issueId];
      } else {
        delete state.comicHistory[action.payload.itemId]?.issuesRead[action.payload.issueId];
      }
    },
    deleteHistoryItem: (state, action: PayloadAction<DeleteHistoryItemAction>) => {
      if (action.payload.isReadingListItem) {
        delete state.readingListHistory[action.payload.itemId];
      } else {
        delete state.comicHistory[action.payload.itemId];
      }
    },
  },
});

export const { addItemToHistory, updateHistoryItem, deleteHistoryItem, deleteHistoryIssue, togglePauseHistory, setPlaylist, setPreviousPage } =
  readingHistorySlice.actions;

export default readingHistorySlice.reducer;
