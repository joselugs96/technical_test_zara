import "@/App.css";
import Home from "@/pages/Home";
import PodcastDetail from "@/pages/PodcastDetail";
import EpisodeDetail from "@/pages/EpisodeDetail";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";

function App() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetail />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
