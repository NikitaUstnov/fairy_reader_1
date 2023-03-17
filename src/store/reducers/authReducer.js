import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    isAuthenticated: false,
    isLoaded: true,
    email: "",
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload;
    },

    logout: (state, action) => {
      state.isAuthenticated = false;
      state.isLoaded = true;
    },

    loading: (state, action) => {
      state.isLoaded = action.payload;
    },

    isAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.isLoaded = true;
      state.email = action.payload;
    },
  },
});

export default authReducer.reducer;

export const { login, loading, isAuthenticated, logout } = authReducer.actions;
