import { Route, Routes } from "react-router-dom";
import {
  CreatePodcastPage,
  FeedPage,
  LandingPage,
  PodcastListPage,
  PodcastPage,
  AppScaffold,
  LandingScaffold,
} from "./pages";

export function App() {
  return (
    <Routes>
      <Route element={<LandingScaffold />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route element={<AppScaffold />}>
        <Route path="/episodes">
          <Route path=":sortType" element={<FeedPage />} />
          <Route path="" element={<FeedPage />} />
        </Route>
        <Route path="/podcasts" element={<PodcastListPage />} />
        <Route path="/podcast">
          <Route path="create" element={<CreatePodcastPage />} />
          <Route path=":id" element={<PodcastPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
