import { ChainId, Config } from "@usedapp/core";

export const dappConfig: Config = {
  readOnlyChainId: ChainId.Mumbai,
  readOnlyUrls: {
    [ChainId.Mumbai]: "https://rpc-mumbai.maticvigil.com",
    /* TODO: Add the rest of networks */
  },
};
