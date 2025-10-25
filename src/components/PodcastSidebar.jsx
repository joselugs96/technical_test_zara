function PodcastSidebar({ image, name, author }) {
  return (
    <>
      <img
        src={image}
        alt={name}
        className="w-40 h-40 rounded-2xl object-cover mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-1 italic">by {author}</p>
      <p className="text-sm text-gray-700">
        Falta traer la descripción del podcast.
      </p>
    </>
  );
}

export default PodcastSidebar;
