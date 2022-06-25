import { Route, Routes } from "react-router-dom";
import {
  CreatePodcastPage,
  FeedPage,
  LandingPage,
  PodcastListPage,
  PodcastPage,
  Scaffold,
} from "./pages";

export function App() {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="app" element={<Scaffold />}>
        <Route element={<FeedPage />} />
        <Route path="podcasts" element={<PodcastListPage />} />
        <Route path="podcast/{id}" element={<PodcastPage />} />
        <Route path="podcast/create" element={<CreatePodcastPage />} />
      </Route>
    </Routes>
  );
}
