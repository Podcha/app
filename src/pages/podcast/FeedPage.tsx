import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export enum FeedSortType {
  Newest,
  Recommended,
}

export function FeedPage() {
  const { sortType: rawSortType } = useParams();

  const [sortType, setSortType] = useState(FeedSortType.Recommended);

  useEffect(() => {
    switch (rawSortType?.toLowerCase()) {
      case "recommended":
        return setSortType(FeedSortType.Recommended);
      case "newest":
        return setSortType(FeedSortType.Newest);
    }
  }, [rawSortType]);

  return <div>FeedPage (sort type: {FeedSortType[sortType]})</div>;
}
