function PodcastDetailCard({ image, name, author, genre }) {
  return (
    <>
      <img
        src={image}
        alt={name}
        className="w-40 h-40 rounded-2xl object-cover mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-1 italic">by {author}</p>
      <p className="text-xs text-gray-500 mb-4">{genre}</p>
      <p className="text-sm text-gray-700">
        A podcast where musicians take apart their songs, and piece by piece,
        tell the story of how they were made.
      </p>
    </>
  );
}

export default PodcastDetailCard;
