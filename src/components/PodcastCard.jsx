import React from 'react';

function PodcastCard({ podcast }) {
    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
        <img
            src={podcast['im:image'][2].label}
            alt={podcast['im:name'].label}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 object-cover"
        />
        <h3 className="font-semibold text-sm md:text-base mb-1">
            {podcast['im:name'].label}
        </h3>
        <p className="text-xs text-gray-500">
            Author: {podcast['im:artist'].label}
        </p>
        </div>
    );
}

export default PodcastCard;
