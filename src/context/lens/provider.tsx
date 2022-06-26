import { useEthers } from "@usedapp/core";
import { useCallback, useEffect, useState } from "react";
import { lensApiClient, getProfiles } from "../../queries";
import { LensContext } from "./context";
import { LensProfile } from "./interfaces";

export function LensProvider({ children }: { children: JSX.Element }) {
  const [profiles, setProfiles] = useState<LensProfile[]>();
  const defaultProfile = profiles?.find((profile) => profile.isDefault);

  const [activeProfile, setActiveProfile] = useState<LensProfile>();

  const { account: address } = useEthers();

  const refreshProfiles = useCallback(() => {
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
  }, [address]);

  useEffect(() => {
    refreshProfiles();
    // TODO: this response is paginated, and we're just silently ignoring this fact
  }, [refreshProfiles]);

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
        refreshProfiles,
        setActiveProfile,
      }}
    >
      {children}
    </LensContext.Provider>
  );
}
