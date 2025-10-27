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
    return <p className="p-6">Loading Details...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50 min-h-screen">
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
