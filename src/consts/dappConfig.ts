import { ChainId, Config } from "@usedapp/core";
import { rpcUrls } from "./rpcUrls";

export const dappConfig: Config = {
  readOnlyChainId: ChainId.Mumbai,
  readOnlyUrls: rpcUrls,
};
