import WalletConnectProvider from "@walletconnect/web3-provider";
import { rpcUrls } from "./rpcUrls";

export const walletConnectProvider = new WalletConnectProvider({
  rpc: rpcUrls as { [key: number]: string },
});
