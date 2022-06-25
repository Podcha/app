import { useEthers } from "@usedapp/core";
import { createContext, useContext, useEffect, useState } from "react";
import { lensApiClient, getProfiles } from "../queries";

interface LensProfilePicture {
  original: {
    mimeType: null;
    url: string;
  };
}

interface LensProfileStats {
  totalCollects: 0;
  totalComments: 0;
  totalFollowers: 0;
  totalFollowing: 0;
  totalMirrors: 0;
  totalPosts: 0;
  totalPublications: 0;
}

interface LensProfile {
  attributes: { [key: string]: { traitType: string; value: any } };
  bio: string | null;
  coverPicture: string | null;
  dispatcher: string | null;
  followModule: string | null;
  handle: string;
  id: string;
  isDefault: boolean;
  metadata: string | null; // ipfs url
  name: string | null; // regular string or null
  ownedBy: string; // wallet address
  picture: LensProfilePicture;
  stats: LensProfileStats;
  metadataObject: any | undefined;
}

interface LensContextValue {
  profiles?: LensProfile[];
  activeProfile?: LensProfile;
  defaultProfile?: LensProfile;
  setActiveProfile: (profile: LensProfile) => void;
}

export const LensContext = createContext<LensContextValue>({
  setActiveProfile: () => {},
});

export function LensProvider({ children }: { children: JSX.Element }) {
  const [profiles, setProfiles] = useState<LensProfile[]>();
  const defaultProfile = profiles?.find((profile) => profile.isDefault);

  const [activeProfile, setActiveProfile] = useState<LensProfile>();

  const { account: address } = useEthers();

  useEffect(() => {
    if (!address) return setProfiles(undefined);
    lensApiClient
      .query(getProfiles, { address })
      .toPromise()
      .then(async (response) => {
        const profiles: any[] = response.data.profiles.items;
        setProfiles(
          profiles.map((profile) => {
            profile.attributes = (profile.attributes as any[]).reduce(
              (prev, curr) => {
                const { key, ...rest } = curr;
                prev[key] = rest;
                return prev;
              },
              {}
            );
            return profile;
          })
        );
      });
    // TODO: this response is paginated, and we're just silently ignoring this fact
  }, [address]);

  useEffect(() => {
    setActiveProfile(
      profiles
        ?.sort((a, b) => ("" + a.name).localeCompare("" + b.name))
        .sort((a, b) => Number(a.isDefault) - Number(b.isDefault))[0]
    );
  }, [profiles]);

  return (
    <LensContext.Provider
      value={{
        profiles,
        defaultProfile,
        activeProfile,
        setActiveProfile,
      }}
    >
      {children}
    </LensContext.Provider>
  );
}

export const useLens = () => useContext(LensContext);
