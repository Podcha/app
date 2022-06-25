import { useEthers } from "@usedapp/core";
import { walletConnectProvider } from "../consts";
import { DropdownIcon } from "./icons";

export function WalletButton() {
  const { activate, activateBrowserWallet, account } = useEthers();

  const activateWalletConnect = async () => {
    await walletConnectProvider.enable();
    activate(walletConnectProvider);
  };

  if (!account) {
    return (
      <ul className="p-0 menu menu-horizontal rounded-box">
        <li>
          <a>
            Connect wallet
            <DropdownIcon />
          </a>
          <ul className="p-2 bg-base-200">
            <li>
              <button onClick={activateBrowserWallet}>Browser wallet</button>
            </li>
            <li>
              <button onClick={activateWalletConnect}>WalletConnect</button>
            </li>
          </ul>
        </li>
      </ul>
    );
  }

  return (
    <button className="btn">
      <div
        className="h-12 w-12 m-[calc(-1rem-1px)] mr-4 rounded-l-[0.5rem] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://api.lorem.space/image/face?hash=33791)`,
        }}
      />
      @lensrocks
    </button>
  );
}
