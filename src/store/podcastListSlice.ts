import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PodcastListType = any;
const initialState: PodcastListType | null = [];

export const podcastListSlice = createSlice({
  name: "podcastList",
  initialState: initialState,
  reducers: {
    setPodcastList: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
});

export const { setPodcastList } = podcastListSlice.actions;

export default podcastListSlice.reducer;
