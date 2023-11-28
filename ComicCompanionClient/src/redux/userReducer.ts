import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../types";

interface UserSliceState {
  user: { ["value"]: UserInfo };
}

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
export const userSelector = (state: UserSliceState) => state.user.value;
export default userSlice.reducer;
