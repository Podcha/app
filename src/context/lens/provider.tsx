import { useEthers } from "@usedapp/core";
import { useCallback, useEffect, useState } from "react";
import {
  lensHubProxyAddress,
  lensMockProfileCreationAddress,
  lensPeripheryAddress,
} from "../../consts";
import {
  LensHub,
  LensHub__factory,
  LensPeriphery,
  LensPeriphery__factory,
  MockProfileCreationProxy,
  MockProfileCreationProxy__factory,
} from "../../contracts/lens";
import { lensApiClient, getProfiles, getProfilesByMirror } from "../../queries";
import { LensContext } from "./context";
import { LensProfile } from "./interfaces";

export function LensProvider({ children }: { children: JSX.Element }) {
  const [profiles, setProfiles] = useState<LensProfile[]>();

  const [profileContract, setProfileContract] =
    useState<MockProfileCreationProxy>();
  const [peripheryContract, setPeripheryContract] = useState<LensPeriphery>();
  const [hubContract, setHubContract] = useState<LensHub>();

  const defaultProfile = profiles?.find((profile) => profile.isDefault);

  const [activeProfile, setActiveProfile] = useState<LensProfile>();

  const { account: address, library } = useEthers();

  const refreshProfiles = useCallback(() => {
    if (!address) return setProfiles(undefined);
    lensApiClient
      .query(getProfiles, { address })
      .toPromise()
      .then(async (response) => {
        const newProfiles: any[] = response.data.profiles.items;
        // TODO: this response is paginated, and we're just silently ignoring this fact
        setProfiles(
          newProfiles.map((profile) => {
            console.log(profile);
            return {
              ...profile,
              attributes: profile.attributes
                ? (profile.attributes as any[]).reduce((prev, curr) => {
                    const { key, ...rest } = curr;
                    prev[key] = rest;
                    return prev;
                  }, {})
                : {},
            };
          })
        );
      });
  }, [address]);

  /* Reinstantiate contracts on provider change */
  useEffect(() => {
    if (!library) {
      setProfileContract(undefined);
      setPeripheryContract(undefined);
      return;
    }
    const providerOrSigner = address ? library.getSigner(address) : library;
    setProfileContract(
      MockProfileCreationProxy__factory.connect(
        lensMockProfileCreationAddress,
        providerOrSigner
      )
    );
    setPeripheryContract(
      LensPeriphery__factory.connect(lensPeripheryAddress, providerOrSigner)
    );

    setHubContract(
      LensHub__factory.connect(lensHubProxyAddress, providerOrSigner)
    );
  }, [address, library]);

  /* Refresh profiles every time the provider changes */
  useEffect(() => {
    refreshProfiles();
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
        profileContract,
        peripheryContract,
        hubContract,
      }}
    >
      {children}
    </LensContext.Provider>
  );
}
