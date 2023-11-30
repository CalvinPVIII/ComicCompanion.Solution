import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIssue } from "../types";

type LocalReadingList = { name: string; issues: IIssue[]; description: string };

interface ReadingListInitialState {
  creatingReadingList: boolean;
  currentEditingReadingList: { name: string; issues: IIssue[]; description: string };
}

const initialState: ReadingListInitialState = { creatingReadingList: false, currentEditingReadingList: { name: "", issues: [], description: "" } };

export const readingList = createSlice({
  name: "readingList",
  initialState: initialState,
  reducers: {
    setCreatingReadingList: (state, action: PayloadAction<boolean>) => {
      state.creatingReadingList = action.payload;
    },
    editCurrentEditingReadingList: (state, action: PayloadAction<LocalReadingList>) => {
      state.currentEditingReadingList = action.payload;
    },
  },
});

export const { setCreatingReadingList, editCurrentEditingReadingList } = readingList.actions;

export const creatingReadingListSelector = (state: ReadingListInitialState) => state.creatingReadingList;
export const currentEditingReadingListSelector = (state: ReadingListInitialState) => state.currentEditingReadingList;

export default readingList.reducer;
