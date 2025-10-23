import "@/App.css";
import Home from "@/pages/Home";
import PodcastDetail from "@/pages/PodcastDetail";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
    </Routes>
  );
}

export default App;
