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
import { Error404Page } from "./pages/error/Error404Page";

export function App() {
  return (
    <Routes>
      <Route element={<LandingScaffold />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Error404Page />} />
      </Route>
      <Route element={<AppScaffold />}>
        <Route path="/episodes">
          <Route path=":sortType" element={<FeedPage />} />
          <Route path="" element={<FeedPage />} />
        </Route>
        <Route path="/podcasts">
          <Route path="" element={<PodcastListPage />} />
          <Route path=":id" element={<PodcastPage />} />
        </Route>
        <Route path="/create-podcast" element={<CreatePodcastPage />} />
      </Route>
    </Routes>
  );
}
