import { useState } from "react";
import { ethers } from "ethers";
import { useEthers } from "@usedapp/core";
import { useLens } from "../../context";

export function CreatePodcastPage() {
  const { account } = useEthers();
  const { profiles, refreshProfiles } = useLens();
  const [userHandle, setUserHandle] = useState<string>("");

  const profileCreate = async () => {
    const inputStruct = {
      to: account,
      handle: userHandle,
      imageURI:
        "https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
      followModule: ethers.constants.AddressZero,
      followModuleInitData: ethers.utils.concat([]),
      followNFTURI:
        "https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS",
    };

    try {
      /* @ts-ignore */
      const tx = await lensMockProfileContract.proxyCreateProfile(inputStruct);
      await tx.wait();
      refreshProfiles();
    } catch (error) {
      console.error({ error });
    }
  };

  // const setDefaultProfile = async () => {
  //   try {
  //     const tx = await lensHubContract.setDefaultProfile(
  //       ethers.BigNumber.from("lens-profile-id")
  //     );
  //     await tx.wait();
  //   } catch (error) {
  //     console.error({ error });
  //   }
  // };

  // const post = async () => {
  //   const postStruct = {
  //     profileId: ethers.BigNumber.from("lens-profile-id"),
  //     contentURI:
  //       "https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz",
  //     collectModule: freeCollectModuleAddress,
  //     collectModuleInitData: ethers.utils.defaultAbiCoder.encode(
  //       ["bool"],
  //       [true]
  //     ),
  //     referenceModule: ethers.constants.AddressZero,
  //     referenceModuleInitData: [],
  //   };

  //   try {
  //     const tx = await lensHubContract.post(postStruct);
  //     await tx.wait();
  //   } catch (error) {
  //     console.error({ error });
  //   }
  // };

  return (
    <div>
      {account}
      <div>
        <input
          type="text"
          onChange={(event) => setUserHandle(event.target.value)}
          value={userHandle}
        />
        <button onClick={profileCreate}>Create</button>
        {profiles && (
          <div>
            List of your profiles:
            {profiles.map((profile) => (
              <p key={profile.handle}>{profile.handle}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
