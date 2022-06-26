import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

// TODO: add typings for these libraries
// @ts-ignore
import { Web3Storage } from "web3.storage";
// @ts-ignore
import { NFTStorage } from "nft.storage";

import { v4 as uuidv4 } from "uuid";
import { useEthers } from "@usedapp/core";
import { useLens } from "../../context";
import { useNavigate } from "react-router-dom";
import { WorldIDComponent } from "../../components/WorldIDComponent";

export function CreatePodcastPage() {
  const navigate = useNavigate();
  const [userHandle, setUserHandle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>();
  const [coverPhoto, setCoverPhoto] = useState<File | null>();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | undefined>();
  const [worldIDProof, setWorldIDProof] = useState<string>("");

  const { account } = useEthers();
  const {
    profiles,
    refreshProfiles,
    peripheryContract,
    profileContract,
    hubContract,
    activeProfile,
  } = useLens();

  const initMirror = useCallback(async () => {
    const mirrorStruct = {
      profileId: ethers.BigNumber.from(activeProfile?.id),
      publicationId: "0x2704-0x01",
      profileIdPointed: ethers.BigNumber.from("0x2704"),
      pubIdPointed: ethers.BigNumber.from("0x01"),
      referenceModuleData: [],
      referenceModule: ethers.constants.AddressZero,
      referenceModuleInitData: [],
    };

    const mirrorTx = await hubContract?.mirror(mirrorStruct);
    await mirrorTx?.wait();
  }, [activeProfile?.id, hubContract]);

  const setProfileMetadata = useCallback(
    async (id: string) => {
      if (!coverPhoto) throw new Error("No avatar selected");
      const storage = new Web3Storage({
        /* @ts-ignore */
        token: process.env.REACT_APP_WEB3_STORAGE,
      });

      const coverImageCid = await storage.put([coverPhoto], {
        maxRetries: 3,
        wrapWithDirectory: false,
      });

      setStep(7);

      const imageCID = `https://${coverImageCid}.ipfs.dweb.link/`;

      const metadata = {
        name: title,
        bio,
        cover_picture: imageCID,
        attributes: [
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

      setStep(8);

      const updateMetadata = await peripheryContract!.setProfileMetadataURI(
        ethers.BigNumber.from(id),
        `https://${cid}.ipfs.dweb.link/`
      );
      await updateMetadata.wait();

      setStep(0);
      refreshProfiles();
    },
    [bio, coverPhoto, peripheryContract, title, refreshProfiles]
  );

  useEffect(() => {
    (async () => {
      if (step !== 5) return;
      const profile = profiles?.filter(
        (profile) => profile.handle.split(".")[0] === userHandle
      )[0];
      if (!profile) {
        refreshProfiles();
        return;
      }
      setStep(6);
      try {
        await setProfileMetadata(profile.id);
        setStep(9);
        await initMirror();
        navigate("/podcasts");
      } catch (error) {
        setError((error as Error).message);
        setStep(0);
      }
    })();
  }, [
    step,
    profiles,
    setProfileMetadata,
    userHandle,
    refreshProfiles,
    initMirror,
    navigate,
  ]);

  const profileCreate = async () => {
    if (!avatar) throw new Error("No avatar selected");

    const storage = new Web3Storage({
      /* @ts-ignore */
      token: process.env.REACT_APP_WEB3_STORAGE,
    });

    const cid = await storage.put([avatar], {
      maxRetries: 3,
    });

    setStep(2);

    const client = new NFTStorage({
      /* @ts-ignore */
      token: process.env.REACT_APP_NFT_STORAGE,
    });

    const fileType = avatar.name.split(".")[1];
    const nftURI = await client.store({
      image: new Blob([avatar], { type: `image/${fileType}` }),
      description: "Podcha",
      name: userHandle,
    });
    const followNFTURI = nftURI.url;

    setStep(3);

    const inputStruct = {
      to: account!,
      handle: userHandle,
      imageURI: `https://${cid}.ipfs.dweb.link/${avatar.name}`,
      followModule: ethers.constants.AddressZero,
      followModuleInitData: ethers.utils.concat([]),
      followNFTURI,
    };

    const tx = await profileContract!.proxyCreateProfile(inputStruct);
    const receipt = await tx.wait();
    console.log(receipt);
    setStep(5);
    refreshProfiles();
  };

  if (!account) {
    return <div>You need to connect your wallet to create a podcast.</div>;
  }

  const createPodcast = async () => {
    setStep(1);
    try {
      await profileCreate();
    } catch (error) {
      setError((error as Error).message);
      setStep(0);
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
      <div className="text-lg bold">Create podcast</div>
      {account && (
        <WorldIDComponent
          signal={account}
          setProof={(proof: any) => setWorldIDProof(proof)}
        />
      )}
      <div>
        <div className="w-full max-w-xs form-control">
          <label className="label">
            <span className="label-text">Your new handle</span>
          </label>
          <input
            className="w-full max-w-xs input input-bordered"
            type="text"
            placeholder="e.g. keescast"
            onChange={(event) => setUserHandle(event.target.value)}
            value={userHandle}
          />
        </div>

        <div className="w-full max-w-xs form-control ">
          <label className="label">
            <span className="label-text">Select an avatar</span>
          </label>
          <div className="flex items-center justify-center input input-bordered">
            <input
              className="flex items-center justify-center w-full max-w-xs p-0 "
              type="file"
              multiple={false}
              onChange={(event) =>
                setAvatar(
                  event.target.files ? event.target.files[0] : undefined
                )
              }
            />
          </div>
        </div>

        <div className="w-full max-w-xs form-control ">
          <label className="label">
            <span className="label-text">Select a cover photo</span>
          </label>
          <div className="flex items-center justify-center input input-bordered">
            <input
              className="flex items-center justify-center w-full max-w-xs p-0 "
              type="file"
              multiple={false}
              onChange={(event) =>
                setCoverPhoto(
                  event.target.files ? event.target.files[0] : undefined
                )
              }
            />
          </div>
        </div>

        <div className="w-full max-w-xs form-control">
          <label className="label">
            <span className="label-text">Podcast title</span>
          </label>
          <input
            className="w-full max-w-xs input input-bordered"
            type="text"
            placeholder="e.g. Salty Keez & Friends"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </div>

        <div className="w-full max-w-xs form-control">
          <label className="label">
            <span className="label-text">Podcast description</span>
          </label>
          <input
            className="w-full max-w-xs input input-bordered"
            type="text"
            placeholder="e.g. Long, long ago... in a far away lorem ipsum dolor sit amet..."
            onChange={(event) => setBio(event.target.value)}
            value={bio}
          />
        </div>

        <button className="mt-2 btn" onClick={createPodcast}>
          Create
        </button>
      </div>
      {/* Progress modal */}
      <label className={`modal ${step ? "modal-open" : ""}`}>
        <label className="relative modal-box">
          <h3 className="text-lg font-bold">Creating a Podcast...</h3>
          <progress
            className="w-full progress progress-primary"
            value={step}
            max={9}
          ></progress>
          <p className="py-4">
            Please sign the transactions to create a podcast...
          </p>
        </label>
      </label>
      <label className={`cursor-pointer modal ${error ? "modal-open" : ""}`}>
        <label className="relative modal-box">
          <label
            onClick={() => setError(undefined)}
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Error has occurred</h3>
          <p className="py-4">{error}</p>
        </label>
      </label>
    </div>
  );
}
