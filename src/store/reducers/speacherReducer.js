import { createSlice } from "@reduxjs/toolkit";

const speacherReducer = createSlice({
  name: "speacherReducer",
  initialState: {
    isActive: false,
  },
  reducers: {
    setActivity: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export default speacherReducer.reducer;

export const { setActivity } = speacherReducer.actions;
