import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";
import { NFTStorage } from "nft.storage";
import { v4 as uuidv4 } from "uuid";
import { useEthers } from "@usedapp/core";
import { useLens } from "../../context";
import {
  mockProfileAddress,
  LensHubProxyAddress,
  freeCollectModuleAddress,
  LensPeripheryAddress,
} from "../../consts";
import {
  LensHub__factory,
  LensHub,
  MockProfileCreationProxy__factory,
  MockProfileCreationProxy,
  LensPeriphery,
  LensPeriphery__factory,
} from "../../contracts/lens";

export function CreatePodcastPage() {
  const [user, setUser] = useState(null);
  const [userHandle, setUserHandle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [lensId, setLensId] = useState<string>("");
  const [lensHubContract, setLensHubContract] = useState<LensHub>();
  const [imageCID, setImageCID] = useState<string>("");
  const [file, setFile] = useState<FileList | null>();
  const [lensMockProfileContract, setLensMockProfileContract] =
    useState<MockProfileCreationProxy>();
  const [lensPeripheryContract, setLensPeripheryContract] =
    useState<LensPeriphery>();

  const connect = async () => {
    /* @ts-ignore */
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setUser(accounts[0]);
  };


  const { account } = useEthers();
  const { profiles, refreshProfiles } = useLens();

  const profileCreate = async () => {
    const storage = new Web3Storage({
      /* @ts-ignore */
      token: process.env.REACT_APP_WEB3_STORAGE,
    });
    /* @ts-ignore */
    const cid = await storage.put(file, {
      maxRetries: 3,
    });

    if (file) setImageCID(`https://${cid}.ipfs.dweb.link/${file[0].name}`);

    const client = new NFTStorage({
      /* @ts-ignore */
      token: process.env.REACT_APP_NFT_STORAGE,
    });

    let followNFTURI = "";

    if (file) {
      const fileType = file[0].name.split(".")[1];
      const nftURI = await client.store({
        image: new Blob([file[0]], { type: `image/${fileType}` }),
        description: "Podcha",
        name: userHandle,
      });
      followNFTURI = nftURI.url;
    }

    const inputStruct = {
      to: account,
      handle: userHandle,
      imageURI: imageCID,
      followModule: ethers.constants.AddressZero,
      followModuleInitData: ethers.utils.concat([]),
      followNFTURI,
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

  const setProfileMetadata = async () => {
    try {
      const storage = new Web3Storage({
        /* @ts-ignore */
        token: process.env.REACT_APP_WEB3_STORAGE,
      });

      let imageCID = "";

      if (file) {
        const coverImageCid = await storage.put(file, {
          maxRetries: 3,
          wrapWithDirectory: false,
        });

        imageCID = `https://${coverImageCid}.ipfs.dweb.link/`;
      }
      const metadata = {
        name: title,
        bio,
        cover_picture: imageCID,
        attributes: [
          {
            traitType: "boolean",
            value: false,
            key: "isCreator",
          },
          {
            traitType: "string",
            value: "Podcha",
            key: "app",
          },
        ],
        version: "1.0.0",
        metadata_id: uuidv4(),
      };

      const blob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });
      const metadataFile = new File([blob], "metadata.json");

      const cid = await storage.put([metadataFile], {
        maxRetries: 3,
        wrapWithDirectory: false,
      });

      const updateMetadata = await lensPeripheryContract?.setProfileMetadataURI(
        ethers.BigNumber.from(lensId),
        `https://${cid}.ipfs.dweb.link/`
      );
      await updateMetadata?.wait();
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

    const setContracts = async () => {
      try {
        /* @ts-ignore */
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setLensHubContract(
          LensHub__factory.connect(LensHubProxyAddress, signer)
        );
        setLensMockProfileContract(
          MockProfileCreationProxy__factory.connect(mockProfileAddress, signer)
        );
        setLensPeripheryContract(
          LensPeriphery__factory.connect(LensPeripheryAddress, signer)
        );
      } catch (error) {
        console.error({ error });
      }
    };

    setContracts();
  }, [user]);

  if (!user) {
    return <button onClick={connect}>Connect</button>;
  }

  return (
    <div className="text-black">
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
            <p>Selected Profile: {lensId}</p>
            <div className="flex flex-col gap-2 m-2">
              {profiles.map((profile) => (
                <div
                  key={profile.handle}
                  onClick={() => setLensId(profile.id)}
                  className="w-40 h-20 border-solid border-4 border-black cursor-pointer hover:scale-110 active:scale-90"
                >
                  <img
                    src={profile.picture?.original?.url}
                    alt="ProfilePic"
                    className="w-10 h-10"
                  />
                  <p>{profile.handle}</p>
                </div>
              ))}
            </div>
            {lensId && (
              <div>
                <p>Title: </p>
                <input
                  type="text"
                  onChange={(event) => setTitle(event.target.value)}
                  value={title}
                />
                <p>Bio: </p>
                <input
                  type="text"
                  onChange={(event) => setBio(event.target.value)}
                  value={bio}
                />
                <input
                  type="file"
                  onChange={(event) => setFile(event.target.files)}
                />
                <button onClick={setProfileMetadata}>Add metadata</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
