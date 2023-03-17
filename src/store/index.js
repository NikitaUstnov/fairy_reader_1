import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storyReducer from "./reducers/storyReducer";
import authReducer from "./reducers/authReducer";
import speacherReducer from "./reducers/speacherReducer";
import topicsReducer from "./reducers/topicsReducer";

const rootRedicer = combineReducers({
  stories: storyReducer,
  auth: authReducer,
  speach: speacherReducer,
  topics: topicsReducer,
});

const store = configureStore({
  reducer: rootRedicer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export { store };
