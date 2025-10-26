import PodcastSidebar from "@/components/PodcastSidebar";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import React, { useMemo } from "react";

function EpisodeDetail() {
  const { episodeId } = useParams();
  const podcastDetail = useAppSelector((state) => state.podcast);

  const episodeDetail = useMemo(() => {
    if (!podcastDetail || !episodeId) return null;

    return podcastDetail.episodes?.find((ep) => ep.id === episodeId);
  }, [podcastDetail, episodeId]);

  if (!podcastDetail || !episodeDetail) {
    return <p className="p-6">Cargando detalles del episodio...</p>;
  }

  const {
    title: episodeTitle,
    description: episodeDescription,
    audio: audioUrl,
  } = episodeDetail;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50 min-h-screen">
      <aside className="md:col-span-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center h-fit">
        <PodcastSidebar />
      </aside>
      <main className="md:col-span-3 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          {episodeTitle}
        </h2>
        <div
          className="text-gray-700 italic leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: episodeDescription }}
        />
        <div className="w-full mt-8 pt-4 border-t border-gray-200">
          {audioUrl ? (
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Tu navegador no soporta el reproductor de audio.
            </audio>
          ) : (
            <p className="text-red-500">
              Audio no disponible para este episodio.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default EpisodeDetail;
