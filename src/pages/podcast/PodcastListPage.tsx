import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { lensAppId } from "../../consts";
import { LensProfile, useLens } from "../../context";

export function PodcastListPage() {
  const { fetchPodcasts } = useLens();
  const [podcasts, setPodcasts] = useState<LensProfile[]>();

  useEffect(() => {
    fetchPodcasts().then(setPodcasts);
  }, [fetchPodcasts, setPodcasts]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {podcasts
        ?.filter(
          (podcast) =>
            podcast.attributes?.app?.value === lensAppId && podcast.coverPicture
        )
        .map((podcast) => (
          <Link key={podcast.handle} to={`/podcasts/${podcast.handle}`}>
            <div className="shadow-xl card bg-base-100">
              <figure>
                <img
                  src={podcast.coverPicture!.original.url}
                  alt="Podcast header"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{podcast.name}</h2>
                <p>{podcast.bio}</p>
                <div className="justify-end card-actions">
                  <button className="btn btn-primary">Follow</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
