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
}

export const LensContext = createContext<LensContextValue>({
  setActiveProfile: () => {},
  refreshProfiles: () => {},
  fetchPodcasts: () => {
    return Promise.resolve([]);
  },
});

export const useLens = () => useContext(LensContext);
