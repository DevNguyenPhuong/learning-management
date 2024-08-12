import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode:
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
  id: "",
  full_name: "",
  userName: "",
  age: "",
  gender: "",
  description: "",
  major: "",
  objective: " ",
  email: " ",
  expericene: "",
  isAuthenticated: false,
  role: "",
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
    setUserData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUserData(state, action) {
      return {
        ...state,
        id: "",
        full_name: "",
        userName: "",
        age: "",
        gender: "",
        description: "",
        major: "",
        objective: " ",
        email: " ",
        expericene: "",
        isAuthenticated: false,
        role: "",
      };
    },
  },
});

export const { turnOnDarkMode, turnOnLightMode, setUserData, clearUserData } =
  userSlice.actions;

export default userSlice.reducer;
