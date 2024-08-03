import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode:
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    turnOnDarkMode(state, action) {
      return {
        ...state,
        mode: "dark",
      };
    },
    turnOnLightMode(state, action) {
      return {
        ...state,
        mode: "light",
      };
    },
  },
});

export const { turnOnDarkMode, turnOnLightMode } = userSlice.actions;

export default userSlice.reducer;
