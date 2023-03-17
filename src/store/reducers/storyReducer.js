import { createSlice } from "@reduxjs/toolkit";

const storiesReducer = createSlice({
  name: "storiesReducer",
  initialState: {
    usersStories: [],
    storiesLoaded: false,
  },
  reducers: {
    loadStories: (state, action) => {
      state.storiesLoaded = false;
      state.usersStories = action.payload;
      state.storiesLoaded = true;
    },

    addStory: (state, action) => {
      state.usersStories = [...state.usersStories, action.payload];
    },

    removeStory: (state, action) => {
      state.usersStories = state.usersStories.filter(
        ({ id }) => id !== action.payload
      );
    },

    clearStories: (state) => {
      state.usersStories = [];
    },
  },
});

export default storiesReducer.reducer;

export const { removeStory, addStory, loadStories, clearStories } =
  storiesReducer.actions;
