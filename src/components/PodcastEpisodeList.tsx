import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import type { PodcastDetail, Episode } from "@/types/podcast";
import { formatDate, formatDuration } from "@/utils/formatters";

function PodcastEpisodeList() {
  const podcastDetail = useAppSelector(
    (state) => state.podcast.selectedPodcast as PodcastDetail | null
  );

  if (!podcastDetail) {
    return <p>Loading episodes…</p>;
  }

  const { episodes = [], trackCount, trackId: podcastId } = podcastDetail;
  const episodeCount = trackCount || episodes.length;

  return (
    <section className="space-y-6">
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="font-bold text-left text-xl">
          Episodes: {episodeCount}
        </h2>
      </div>

      <div className="bg-white p-4 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-2 text-left font-bold">Title</th>
              <th className="py-3 px-2 text-left font-bold">Date</th>
              <th className="py-3 px-2 text-left font-bold">Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => (
              <tr
                key={episode.id ?? crypto.randomUUID()}
                className="hover:bg-gray-50"
              >
                <td className="py-2 px-2 text-left text-blue-600 hover:underline">
                  <Link
                    state={{ episode }}
                    to={`/podcast/${podcastId}/episode/${encodeURIComponent(
                      episode.id
                    )}`}
                  >
                    {episode.title}
                  </Link>
                </td>
                <td className="py-2 px-2 text-left text-gray-600">
                  {formatDate(episode.pubDate)}
                </td>
                <td className="py-2 px-2 text-left text-gray-600">
                  {formatDuration(episode.duration) ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PodcastEpisodeList;
