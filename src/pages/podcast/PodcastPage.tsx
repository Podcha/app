import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { lensAppId } from "../../consts";
import { useLens } from "../../context";

export function PodcastPage() {
  const { id } = useParams();
  const { fetchEpisodesOf } = useLens();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchEpisodesOf(id!).then(setPosts);
  }, [fetchEpisodesOf, setPosts, id]);

  return (
    <div>
      {posts.length}
      {posts
        .filter((post) => post.appId === lensAppId)
        .map((post, key) => (
          <pre key={key}>{JSON.stringify(post)}</pre>
        ))}
    </div>
  );
}
