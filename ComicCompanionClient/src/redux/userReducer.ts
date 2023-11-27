import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../types";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: null },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userSelector = (state: { ["value"]: null | UserInfo }) => state.value;
export default userSlice.reducer;
