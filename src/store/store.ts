import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import podcastReducer from "./podcastSlice";
import podcastListReducer from "./podcastListSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    podcast: podcastReducer,
    podcastList: podcastListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
