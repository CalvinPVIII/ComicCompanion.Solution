import { createSlice } from "@reduxjs/toolkit";
import { Comic } from "../types";

export interface LibraryState {
  comics: { [tagName: string]: Comic[] };
}

const initialState: LibraryState = {
  comics: { default: [] },
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {},
});
