import React, { useEffect } from "react";
import PodcastSidebar from "@/components/PodcastSidebar";
import PodcastEpisodeList from "@/components/PodcastEpisodeList";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadPodcastDetail } from "@/services/podcastService";

function PodcastDetail() {
  const { podcastId } = useParams<{ podcastId: string }>();

  const podcastDetail = useAppSelector(
    (state) => state.podcast.selectedPodcast
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (podcastId) {
      loadPodcastDetail(dispatch, podcastId);
    }
  }, [podcastId, dispatch]);

  if (!podcastDetail) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-50">
        <p className="text-xl md:text-2xl font-semibold text-gray-700 animate-pulse">
          Loading Details...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50">
      <aside className="md:col-span-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
        <PodcastSidebar />
      </aside>
      <main className="md:col-span-3">
        <PodcastEpisodeList />
      </main>
    </div>
  );
}

export default PodcastDetail;
