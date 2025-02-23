import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chapter, CurrentlyCreatedReadingList } from "../types";

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
    setCurrentList: (state, action: PayloadAction<CurrentlyCreatedReadingList | null>) => {
      state.currentList = action.payload;
    },
    addIssue: (state, action: PayloadAction<Chapter>) => {
      state.currentList?.issues.push(action.payload);
    },
    bulkAddIssue: (state, action: PayloadAction<Chapter[]>) => {
      if (state.currentList) {
        state.currentList.issues = state.currentList.issues.concat(action.payload);
      }
    },
    removeIssue: (state, action: PayloadAction<Chapter>) => {
      if (state.currentList) {
        state.currentList.issues = state.currentList?.issues.filter((chapter) => chapter.id !== action.payload.id);
      }
    },
    updateProperty: (state, action: PayloadAction<UpdatePropertyPayload>) => {
      if (state.currentList) {
        state.currentList[action.payload.propertyName] = action.payload.value;
      }
    },
  },
});

export const { toggleCreating, setCurrentList, addIssue, removeIssue, updateProperty, bulkAddIssue } = listCreationSlice.actions;

export default listCreationSlice.reducer;
