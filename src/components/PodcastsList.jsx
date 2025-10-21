import React from 'react';
import PodcastCard from './PodcastCard';

function PodcastsList({ podcasts }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id.attributes['im:id']} podcast={podcast} />
      ))}
    </div>
  );
}

export default PodcastsList;

