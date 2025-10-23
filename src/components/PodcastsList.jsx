import React, { useState } from "react";
import PodcastCard from "./PodcastCard";

function PodcastsList({ podcasts }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPodcasts = podcasts.filter((podcast) => {
    const title = podcast["im:name"].label.toLowerCase();
    const author = podcast["im:artist"].label.toLowerCase();
    const term = searchTerm.toLowerCase();
    return title.includes(term) || author.includes(term);
  });

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <span className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full mb-3 sm:mb-0">
          {filteredPodcasts.length}
        </span>
        <input
          type="text"
          placeholder="Filter podcasts..."
          className="border rounded-lg px-4 py-2 w-full sm:w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {filteredPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id.attributes["im:id"]} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}

export default PodcastsList;
