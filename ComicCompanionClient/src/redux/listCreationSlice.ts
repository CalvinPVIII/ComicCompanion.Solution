import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentlyCreatedReadingList, Issue } from "../types";

export interface ListCreationState {
  isCreating: boolean;
  currentList: CurrentlyCreatedReadingList | null;
}

type UpdatePropertyPayload = {
  propertyName: string;
  value: string | boolean;
};

const initialState: ListCreationState = { isCreating: false, currentList: null };

const listCreationSlice = createSlice({
  name: "listCreation",
  initialState,
  reducers: {
    toggleCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
    setCurrentList: (state, action: PayloadAction<CurrentlyCreatedReadingList>) => {
      state.currentList = action.payload;
    },
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.currentList?.issues.push(action.payload);
    },
    removeIssue: (state, action: PayloadAction<Issue>) => {
      if (state.currentList) {
        state.currentList.issues = state.currentList?.issues.filter(
          (issue) => issue.comicId + issue.issueId !== action.payload.comicId + action.payload.issueId
        );
      }
    },
    updateProperty: (state, action: PayloadAction<UpdatePropertyPayload>) => {
      if (state.currentList) {
        state.currentList[action.payload.propertyName] = action.payload.value;
      }
    },
  },
});

export const { toggleCreating, setCurrentList, addIssue, removeIssue, updateProperty } = listCreationSlice.actions;

export default listCreationSlice.reducer;
