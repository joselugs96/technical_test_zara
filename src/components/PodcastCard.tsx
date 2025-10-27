import { Link } from "react-router-dom";
import { PodcastCardProps } from "@/types/podcast";

function PodcastCard({ podcast }: PodcastCardProps) {
  const podcastId = podcast.id.attributes["im:id"];

  return (
    <Link
      to={`/podcast/${podcastId}`}
      state={{ podcastId }}
      className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer"
    >
      <img
        src={podcast["im:image"][2].label}
        alt={podcast["im:name"].label}
        className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 object-cover"
      />
      <h3 className="font-semibold text-sm md:text-base mb-1">
        {podcast["im:name"].label}
      </h3>
      <p className="text-xs text-gray-500">
        Author: {podcast["im:artist"].label}
      </p>
    </Link>
  );
}

export default PodcastCard;
