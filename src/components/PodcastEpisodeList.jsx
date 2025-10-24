import { Link } from "react-router-dom";

function PodcastEpisodeList({ episodes, trackCount }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4">
        Episodes: {episodes.length || trackCount}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4 font-semibold">Title</th>
              <th className="py-2 px-4 font-semibold w-32">Date</th>
              <th className="py-2 px-4 font-semibold w-24 text-right">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((ep, index) => {
              const date = new Date(ep.pubDate).toLocaleDateString();
              const { title: episodeTitle, duration: episodeDuration } = ep;

              return (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4 text-blue-600 hover:underline">
                    {episodeTitle}
                  </td>
                  <td className="py-2 px-4 text-gray-600">{date}</td>
                  <td className="py-2 px-4 text-gray-600 text-right">
                    {episodeDuration}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PodcastEpisodeList;
