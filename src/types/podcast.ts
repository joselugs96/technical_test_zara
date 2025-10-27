export interface LoadingState {
  isLoading: boolean;
}

export interface PodcastImage {
  label: string;
  attributes: {
    height: string;
  };
}

export interface PodcastId {
  label: string;
  attributes: {
    "im:id": string;
  };
}

export interface PodcastArtist {
  label: string;
  attributes?: {
    href?: string;
  };
}

export interface PodcastCategory {
  attributes: {
    "im:id": string;
    term: string;
    scheme: string;
    label: string;
  };
}

export interface PodcastReleaseDate {
  label: string;
  attributes: {
    label: string;
  };
}

export interface PodcastEntry {
  "im:name": {
    label: string;
  };
  "im:image": PodcastImage[];
  summary: {
    label: string;
  };
  "im:price": {
    label: string;
    attributes: {
      amount: string;
      currency: string;
    };
  };
  "im:contentType": {
    attributes: {
      term: string;
      label: string;
    };
  };
  rights: {
    label: string;
  };
  title: {
    label: string;
  };
  link: {
    attributes: {
      rel: string;
      type: string;
      href: string;
    };
  };
  id: PodcastId;
  "im:artist": PodcastArtist;
  category: PodcastCategory;
  "im:releaseDate": PodcastReleaseDate;
}

export interface PodcastCardProps {
  podcast: PodcastEntry;
}

export interface PodcastDetail {
  trackId: number;
  feedUrl?: string;
  artworkUrl600?: string;
  collectionName?: string;
  artistName?: string;
  description: string;
  trackCount: number;
  episodes?: Episode[];
}

export interface Episode {
  id: string | null;
  title: string;
  audio: string | null;
  pubDate: string;
  duration: string | null;
  description: string;
}

export interface PodcastState {
  podcastList: PodcastEntry[];
  selectedPodcast?: PodcastDetail | null;
  isLoading: boolean;
  episodes: Episode[] | null;
}
