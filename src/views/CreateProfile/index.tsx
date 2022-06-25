import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";

import { client, getProfiles } from "../../queries";
import {
  mockProfileAddress,
  LensHubProxyAddress,
  freeCollectModuleAddress,
} from "../../consts";
import {
  LensHub__factory,
  LensHub,
  MockProfileCreationProxy__factory,
  MockProfileCreationProxy,
} from "../../contracts/Lens";

const CreateProfile = () => {
  const [user, setUser] = useState(null);
  const [userHandle, setUserHandle] = useState<string>("");
  const [lensHubContract, setLensHubContract] = useState<LensHub>();
  const [imageCID, setImageCID] = useState<string>("");
  const [file, setFile] = useState<FileList | null>();
  const [lensMockProfileContract, setLensMockProfileContract] =
    useState<MockProfileCreationProxy>();
  const [profiles, setProfiles] = useState<any[]>([]);

  const connect = async () => {
    /* @ts-ignore */
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setUser(accounts[0]);
  };

  const uploadImage = async () => {
    const storage = new Web3Storage({
      /* @ts-ignore */
      token: process.env.REACT_APP_WEB3_STORAGE,
    });
    /* @ts-ignore */
    const cid = await storage.put(file, {
      maxRetries: 3,
    });

    if (file) setImageCID(`https://${cid}.ipfs.dweb.link/${file[0].name}`);
  };

  const profileCreate = async () => {
    if (!imageCID) {
      await uploadImage();
    }
    const inputStruct = {
      to: user,
      handle: userHandle,
      imageURI: imageCID,
      followModule: ethers.constants.AddressZero,
      followModuleInitData: ethers.utils.concat([]),
      followNFTURI:
        "https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS",
    };

    try {
      /* @ts-ignore */
      const tx = await lensMockProfileContract.proxyCreateProfile(inputStruct);
      await tx.wait();
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

  useEffect(() => {
    if (!user) return;

    const fetchProfilesAndSetContracts = async () => {
      try {
        const response = await client
          .query(getProfiles, { address: user })
          .toPromise();
        console.log(response);

        /* @ts-ignore */
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        setProfiles([...(response.data.profiles?.items || null)]);
        setLensHubContract(
          LensHub__factory.connect(LensHubProxyAddress, signer)
        );
        setLensMockProfileContract(
          MockProfileCreationProxy__factory.connect(mockProfileAddress, signer)
        );
      } catch (error) {
        console.error({ error });
      }
    };

    fetchProfilesAndSetContracts();
  }, [user]);

  if (!user) {
    return <button onClick={connect}>Connect</button>;
  }

  return (
    <div>
      {user}
      <div>
        <input
          type="text"
          onChange={(event) => setUserHandle(event.target.value)}
          value={userHandle}
        />
        <button onClick={profileCreate}>Create</button>
        <input type="file" onChange={(event) => setFile(event.target.files)} />
        {profiles && (
          <div>
            List of your profiles:
            {profiles.map((profile) => (
              <div>
                <img src={profile.picture.original.url} alt="ProfilePic" />
                <p key={profile.handle}>{profile.handle}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProfile;
