import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { PodcastDetail } from "@/types/podcast";

function PodcastSidebar() {
  const podcastDetail = useAppSelector(
    (state) => state.podcast.selectedPodcast as PodcastDetail | null
  );

  if (!podcastDetail) {
    return <p>Loading sidebar information…</p>;
  }

  const {
    artworkUrl600: image,
    collectionName: name,
    artistName: author,
    description,
    trackId,
  } = podcastDetail;

  const detailUrl = `/podcast/${trackId}`;

  return (
    <aside className="p-4 border border-gray-300 rounded-lg shadow-md bg-white text-left">
      <Link to={detailUrl} className="block mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-auto rounded-md object-cover"
        />
      </Link>

      <hr className="my-3" />

      <Link to={detailUrl}>
        <h4 className="font-bold text-lg pb-3">{name}</h4>
        <p className="italic text-sm text-gray-600">by {author}</p>
      </Link>

      <hr className="my-3" />

      <h5 className="font-bold mb-2">Description:</h5>
      <div
        className="text-sm text-gray-600 italic"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </aside>
  );
}

export default PodcastSidebar;
