import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const PodcastSidebar = () => {
  const podcastDetail = useAppSelector((state) => state.podcast);

  if (!podcastDetail) {
    return <p>Cargando información lateral...</p>;
  }

  const {
    artworkUrl600: image,
    collectionName: name,
    artistName: author,
    description,
  } = podcastDetail;

  const podcastId = podcastDetail.trackId;
  const detailUrl = `/podcast/${podcastId}`;

  return (
    <aside className="p-4 border border-gray-300 rounded-lg shadow-md">
      <Link to={detailUrl} className="block mb-4">
        <img src={image} alt={name} className="w-full h-auto rounded-md" />
      </Link>

      <hr className="my-3" />

      <Link to={detailUrl}>
        <h4 className="font-bold text-lg">{name}</h4>
        <p className="italic text-sm">by {author}</p>
      </Link>

      <hr className="my-3" />

      <h5 className="font-bold mb-2">Description:</h5>
      <div
        className="text-sm text-gray-600 italic"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </aside>
  );
};

export default PodcastSidebar;
