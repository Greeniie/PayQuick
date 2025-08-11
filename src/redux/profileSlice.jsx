import { createSlice } from "@reduxjs/toolkit";
import profileData from "../mockdata/profile.json";

const profileSlice = createSlice({
  name: "profile",
  initialState: profileData,
  reducers: {},
});

export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;
