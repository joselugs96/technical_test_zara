import React, { useState, ChangeEvent, useMemo } from "react";
import PodcastCard from "./PodcastCard";
import { useAppSelector } from "@/store/hooks";
import { PodcastEntry } from "@/types/podcast";

function PodcastsList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const podcasts = useAppSelector(
    (state) => state.podcastList as PodcastEntry[]
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredPodcasts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return podcasts.filter((podcast) => {
      const title = podcast["im:name"].label.toLowerCase();
      const author = podcast["im:artist"].label.toLowerCase();
      return title.includes(term) || author.includes(term);
    });
  }, [podcasts, searchTerm]);

  return (
    <div className="mx-auto p-4">
      <div className="flex items-center justify-end gap-3 mb-6">
        <span className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full text-center">
          {filteredPodcasts.length}
        </span>

        <input
          type="text"
          placeholder="Filter podcasts..."
          className="border rounded-lg px-4 py-2 w-full sm:w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Filter podcasts by name or author"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id.attributes["im:id"]} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}

export default PodcastsList;
