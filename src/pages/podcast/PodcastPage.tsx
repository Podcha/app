import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { lensAppId } from "../../consts";
import { LensProfile, useLens } from "../../context";

export function PodcastPage() {
  const { id } = useParams();
  const { activeProfile } = useLens();
  const { fetchEpisodesOf, fetchPodcast } = useLens();
  const [posts, setPosts] = useState<any[]>([]);
  const [podcast, setPodcast] = useState<LensProfile>();

  const isCreator = activeProfile && id === activeProfile.id;

  useEffect(() => {
    fetchPodcast(id!).then(setPodcast);
    fetchEpisodesOf(id!).then(setPosts);
  }, [fetchEpisodesOf, setPosts, setPodcast, fetchPodcast, id]);

  if (!podcast) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div
        className="w-full h-40 mb-4 bg-center bg-cover rounded-box"
        style={{
          backgroundImage: `url(${podcast.coverPicture?.original.url})`,
        }}
      ></div>
      <div className="flex flex-row items-end text-2xl font-bold">
        <div>{podcast.name}</div>
        <div className="flex flex-row items-end ml-2 text-xs font-normal">
          @{podcast.handle}
        </div>
      </div>
      <div className="mb-4">Episodes: {posts.length}</div>
      <div className="rounded-box">
        {[
          { metadata: { name: "The Lens goes down" } },
          { metadata: { name: "The blockchain stars come out" } },
          { metadata: { name: "And all that counts" } },
          { metadata: { name: "Is the power of our friendship" } },
        ].map((post, key) => (
          <div
            key={key}
            className={`flex flex-row space-x-4 p-8 items-center bg-black ${
              key % 2 ? "bg-opacity-20" : "bg-opacity-40"
            }`}
          >
            <div>{key + 1}.</div>
            <div className="flex-1">{post.metadata.name}</div>
            <div>
              {key === 0 ? (
                <button className="btn btn-accent">Collected!</button>
              ) : (
                <button className="btn">Collect</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {isCreator && (
        <div className="flex flex-row justify-end mt-2">
          <Link to="/create-episode">
            <button className="btn">+ Add new episode</button>
          </Link>
        </div>
      )}
    </div>
  );
}
