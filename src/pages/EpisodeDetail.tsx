import React, { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import PodcastSidebar from "@/components/PodcastSidebar";
import { useAppSelector } from "@/store/hooks";
import { PodcastDetail } from "@/types/podcast";

function EpisodeDetail() {
  const { episodeId } = useParams<{ episodeId: string }>();

  const podcastDetail = useAppSelector(
    (state) => state.podcast.selectedPodcast as PodcastDetail
  );

  const episodeDetail = useMemo(() => {
    if (!podcastDetail?.episodes || !episodeId) return null;
    return podcastDetail.episodes.find((ep) => ep.id === episodeId) ?? null;
  }, [podcastDetail, episodeId]);

  if (!podcastDetail || !episodeDetail) {
    return <p className="p-6">Loading episode details...</p>;
  }

  const { title, description, audio } = episodeDetail;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50 min-h-screen">
      <aside className="md:col-span-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center h-fit">
        <PodcastSidebar />
      </aside>

      <main className="md:col-span-3 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">{title}</h2>

        <div
          className="text-gray-700 italic leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="w-full mt-8 pt-4 border-t border-gray-200">
          {audio ? (
            <audio controls className="w-full">
              <source src={audio} type="audio/mpeg" />
              Your browser does not support the audio player.
            </audio>
          ) : (
            <p className="text-red-500">
              Audio not available for this episode.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default EpisodeDetail;
