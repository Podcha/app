import { useEthers } from "@usedapp/core";
import { walletConnectProvider } from "../consts";
import { DropdownIcon } from "./icons";

export function WalletButton() {
  const { activate, activateBrowserWallet, account, deactivate } = useEthers();

  const activateWalletConnect = async () => {
    await walletConnectProvider.enable();
    activate(walletConnectProvider);
  };

  if (!account) {
    return (
      <ul className="p-0 menu menu-horizontal rounded-box">
        <li>
          <button className="btn">
            Connect wallet
            <DropdownIcon />
          </button>
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
    <ul className="p-0 menu menu-horizontal rounded-t-box">
      <li>
        <button className="btn">
          <div
            className="w-8 h-8 -m-2 bg-center bg-cover rounded-full"
            style={{
              backgroundImage: `url(https://api.lorem.space/image/face?hash=33791)`,
            }}
          />
          {account.substring(0, 6)}...
          {account.substring(account.length - 4, account.length)}
        </button>
        <ul className="w-full p-2 mt-0 space-y-2 bg-base-200 menu menu-vertical">
          {["Profile 1", "Profile 2", "Profile 3"].map((profile, key) => (
            <button className="btn" key={key}>
              <div
                className="w-8 h-8 mr-2 -m-2 bg-center bg-cover rounded-full"
                style={{
                  backgroundImage: `url(https://api.lorem.space/image/face?hash=${key})`,
                }}
              />
              {profile}
            </button>
          ))}

          <button className="btn" onClick={deactivate}>
            Disconnect
          </button>
        </ul>
      </li>
    </ul>
  );
}
