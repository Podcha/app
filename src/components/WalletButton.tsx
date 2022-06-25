import { useEthers } from "@usedapp/core";
import { lensAppId, walletConnectProvider } from "../consts";
import { useLens } from "../context";
import { DropdownIcon } from "./icons";

export function WalletButton() {
  const { activate, activateBrowserWallet, account, deactivate } = useEthers();
  const { profiles, activeProfile, setActiveProfile } = useLens();

  console.log(profiles);

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
        <button className="flex w-64 btn hover:rounded-b-none">
          {activeProfile?.picture && (
            <div
              className="w-8 h-8 -m-2 bg-center bg-cover rounded-full"
              style={{
                backgroundImage: `url(${activeProfile?.picture?.original.url})`,
              }}
            />
          )}
          <div className="flex-1 w-0 overflow-hidden text-ellipsis">
            {activeProfile
              ? activeProfile.handle
              : `${account.substring(0, 6)}...
          ${account.substring(account.length - 4, account.length)}`}
          </div>
          {activeProfile?.attributes.app?.value === lensAppId ? (
            <div>P</div>
          ) : (
            <div>O</div>
          )}
          <DropdownIcon />
        </button>
        <ul className="z-10 w-full py-2 mt-0 space-y-2 bg-base-200 menu menu-vertical">
          {profiles
            ?.filter((profile) => profile !== activeProfile)
            .map((profile, key) => (
              <button
                className={"btn text-ellipsis flex rounded-none"}
                key={key}
                onClick={() => setActiveProfile(profile)}
              >
                {profile.picture && (
                  <div
                    className="w-8 h-8 mr-1 -m-2 bg-center bg-cover rounded-full"
                    style={{
                      backgroundImage: `url(${profile?.picture.original.url})`,
                    }}
                  />
                )}
                <div className="flex-1 overflow-hidden text-ellipsis">
                  {profile.handle}
                </div>{" "}
                {profile.attributes.app?.value === lensAppId ? (
                  <div>P</div>
                ) : (
                  <div>O</div>
                )}
              </button>
            ))}

          <button className="mx-2 btn" onClick={deactivate}>
            Disconnect
          </button>
        </ul>
      </li>
    </ul>
  );
}
