import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PodcastDetail } from "@/types/podcast";
interface PodcastState {
  selectedPodcast: PodcastDetail | null;
}

const initialState: PodcastState = {
  selectedPodcast: null,
};

export const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    setSelectedPodcast: (state, action: PayloadAction<PodcastDetail>) => {
      state.selectedPodcast = action.payload;
    },
    clearSelectedPodcast: (state) => {
      state.selectedPodcast = null;
    },
  },
});

export const { setSelectedPodcast, clearSelectedPodcast } =
  podcastSlice.actions;

export default podcastSlice.reducer;
