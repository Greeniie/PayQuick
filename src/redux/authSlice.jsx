import { createSlice } from "@reduxjs/toolkit";
import profileData from "../mockdata/profile.json";

const tokenKey = "accessToken";

const initialState = {
  isLoggedIn: !!localStorage.getItem(tokenKey),
  token: localStorage.getItem(tokenKey) || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const mockedToken = "mocked_access_token_123";

      const userFromFile =
        profileData.username?.toLowerCase() === username.trim().toLowerCase()
          ? profileData
          : null;

      // Instead of throwing, just reset state if login fails
      if (!userFromFile || userFromFile.password !== password) {
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;
        return; // exit early
      }

      // Login success
      state.isLoggedIn = true;
      state.token = mockedToken;
      state.user = {
        name: userFromFile.name,
        username: userFromFile.username,
        email: userFromFile.email,
        photo: userFromFile.photo,
      };

      // Persist to localStorage
      localStorage.setItem(tokenKey, mockedToken);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem(tokenKey);
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
