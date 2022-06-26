import { createContext, useContext } from "react";
import {
  LensHub,
  LensPeriphery,
  MockProfileCreationProxy,
} from "../../contracts/lens";
import { LensProfile } from "./interfaces";

export interface LensContextValue {
  profiles?: LensProfile[];
  activeProfile?: LensProfile;
  defaultProfile?: LensProfile;
  profileContract?: MockProfileCreationProxy;
  peripheryContract?: LensPeriphery;
  hubContract?: LensHub;
  setActiveProfile: (profile: LensProfile) => void;
  refreshProfiles: () => void;
  fetchPodcasts: () => Promise<LensProfile[]>;
  fetchPodcast: (id: string) => Promise<LensProfile>;
  fetchEpisodesOf: (id: string) => Promise<any[]>;
}

export const LensContext = createContext<LensContextValue>({
  setActiveProfile: () => {},
  refreshProfiles: () => {},
  fetchPodcasts: () => {
    return Promise.resolve([]);
  },
  fetchPodcast: () => {
    return Promise.reject();
  },
  fetchEpisodesOf: () => {
    return Promise.resolve([]);
  },
});

export const useLens = () => useContext(LensContext);
