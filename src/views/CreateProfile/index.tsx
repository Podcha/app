import { useState } from "react";
import { ethers } from "ethers";

import { client, getProfiles } from "../../queries";
import {
  mockProfileAddress,
  LensHubProxyAddress,
  freeCollectModuleAddress,
} from "../../consts";
import mockProfileABI from "../../abi/mockProfileABI.json";
import LensHubABI from "../../abi/LensHubABI.json";

const CreateProfile = () => {
  const [user, setUser] = useState(null);

  const connect = async () => {
    /* @ts-ignore */
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setUser(accounts[0]);
  };

  const profileCreate = async () => {
    /* @ts-ignore */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      mockProfileAddress,
      mockProfileABI,
      signer
    );

    const inputStruct = {
      to: user,
      handle: "handleName",
      imageURI:
        "https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
      followModule: ethers.constants.AddressZero,
      followModuleInitData: ethers.utils.concat([]),
      followNFTURI:
        "https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS",
    };

    try {
      const tx = await contract.proxyCreateProfile(inputStruct);
      await tx.wait();
    } catch (error) {
      console.error({ error });
    }
  };

  const setDefaultProfile = async () => {
    /* @ts-ignore */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      LensHubProxyAddress,
      LensHubABI,
      signer
    );

    try {
      const tx = await contract.setDefaultProfile(
        ethers.BigNumber.from("lens-profile-id")
      );
      await tx.wait();
    } catch (error) {
      console.error({ error });
    }
  };

  const post = async () => {
    /* @ts-ignore */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      LensHubProxyAddress,
      LensHubABI,
      signer
    );

    const postStruct = {
      profileId: ethers.BigNumber.from("lens-profile-id"),
      contentURI:
        "https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz",
      collectModule: freeCollectModuleAddress,
      collectModuleInitData: ethers.utils.defaultAbiCoder.encode(
        ["bool"],
        [true]
      ),
      referenceModule: ethers.constants.AddressZero,
      referenceModuleInitData: [],
    };

    try {
      const tx = await contract.post(postStruct);
      await tx.wait();
    } catch (error) {
      console.error({ error });
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await client
        .query(getProfiles, { address: user })
        .toPromise();
      console.log(response);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div>
      <button onClick={fetchProfile}>Get Profile</button>
      {user ? user : <button onClick={connect}>Connect</button>}
      <button onClick={profileCreate}>Create</button>
      <button onClick={setDefaultProfile}>Set Default Profile</button>
      <button onClick={post}>Post</button>
    </div>
  );
};

export default CreateProfile;
