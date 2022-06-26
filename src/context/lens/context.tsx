import { createContext, useContext } from "react";
import { LensProfile } from "./interfaces";

export interface LensContextValue {
  profiles?: LensProfile[];
  activeProfile?: LensProfile;
  defaultProfile?: LensProfile;
  setActiveProfile: (profile: LensProfile) => void;
  refreshProfiles: () => void;
}

export const LensContext = createContext<LensContextValue>({
  setActiveProfile: () => {},
  refreshProfiles: () => {},
});

export const useLens = () => useContext(LensContext);
