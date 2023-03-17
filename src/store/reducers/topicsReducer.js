import { createSlice } from "@reduxjs/toolkit";

const topicsReducer = createSlice({
  name: "topicsReducer",
  initialState: {
    topicsList: [],
  },
  reducers: {
    setTopics: (state, action) => {
      state.topicsList = action.payload;
    },

    removeTopic: (state, action) => {
      state.topicsList = state.topicsList.filter(
        (topic) => topic !== action.payload
      );
    },
  },
});

export default topicsReducer.reducer;

export const { setTopics, removeTopic } = topicsReducer.actions;
