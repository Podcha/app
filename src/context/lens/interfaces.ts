export interface LensPicture {
  original: {
    mimeType: null;
    url: string;
  };
}

export interface LensProfileStats {
  totalCollects: 0;
  totalComments: 0;
  totalFollowers: 0;
  totalFollowing: 0;
  totalMirrors: 0;
  totalPosts: 0;
  totalPublications: 0;
}

export interface LensProfile {
  attributes: { [key: string]: { traitType: string; value: any } };
  bio: string | null;
  coverPicture: LensPicture | null;
  dispatcher: string | null;
  followModule: string | null;
  handle: string;
  id: string;
  isDefault: boolean;
  metadata: string | null; // ipfs url
  name: string | null; // regular string or null
  ownedBy: string; // wallet address
  picture: LensPicture;
  stats: LensProfileStats;
  metadataObject: any | undefined;
}
