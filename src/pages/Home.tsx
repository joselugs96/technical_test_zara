import React, { useEffect } from "react";
import PodcastsList from "@/components/PodcastsList";
import { useAppDispatch } from "@/store/hooks";
import { clearSelectedPodcast } from "@/store/podcastSlice";
import { loadTopPodcasts } from "@/services/podcastService";

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearSelectedPodcast());
    loadTopPodcasts(dispatch);
  }, [dispatch]);

  return (
    <div>
      <PodcastsList />
    </div>
  );
}

export default Home;
