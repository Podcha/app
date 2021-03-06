import { useState } from "react";
import { ethers } from "ethers";
import { videonft } from "@livepeer/video-nft";
import { v4 as uuidv4 } from "uuid";
import { useEthers } from "@usedapp/core";
// @ts-ignore
import { Web3Storage } from "web3.storage";
import { useLens } from "../../context";
import { lensFreeCollectModuleAddress } from "../../consts";

export function CreateEpisodePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { account } = useEthers();
  const { hubContract, activeProfile } = useLens();

  const apiOpts = {
    auth: { apiKey: process.env.REACT_APP_LIVE_PEER_API_KEY },
    endpoint: videonft.api.prodApiEndpoint,
  };

  const uploadVideo = async (event = null) => {
    try {
      const windowEthereum = (window as any).ethereum;
      const chainId = await windowEthereum.request({ method: "eth_chainId" });
      /* @ts-ignore */
      const minter = new videonft.minter.FullMinter(apiOpts, {
        windowEthereum,
        chainId,
      });
      const file = await minter.uploader.pickFile();
      setIsLoading(true);
      let asset = await minter.api.createAsset("Podcast", file);
      asset = await minter.api.nftNormalize(asset);

      console.log(asset);

      const nftMetadata = {
        description: "Podcha",
        traits: { app: "Podcha" },
      };
      const ipfs = await minter.api.exportToIPFS(asset.id, nftMetadata);

      // const tx = await minter.web3.mintNft(ipfs.nftMetadataUrl);
      // const nftInfo = await minter.web3.getMintedNftInfo(tx);
      // console.log(
      //   `minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`
      // );

      const storage = new Web3Storage({
        /* @ts-ignore */
        token: process.env.REACT_APP_WEB3_STORAGE,
      });

      const postSchema = {
        version: "1.0.0",
        metadata_id: uuidv4(),
        description,
        content: asset.downloadUrl,
        external_url: null,
        image: null,
        imageMimeType: null,
        name: activeProfile?.name,
        attributes: [],
        media: [],
        appId: "Podcha",
      };
      const blob = new Blob([JSON.stringify(postSchema)], {
        type: "application/json",
      });
      const publicationFile = new File([blob], "publication.json");

      const cid = await storage.put([publicationFile], {
        maxRetries: 3,
        wrapWithDirectory: false,
      });

      const postStruct = {
        profileId: ethers.BigNumber.from(activeProfile?.id),
        contentURI: `https://ipfs.dweb.link/${cid}`,
        collectModule: lensFreeCollectModuleAddress,
        collectModuleInitData: ethers.utils.defaultAbiCoder.encode(
          ["bool"],
          [true]
        ),
        referenceModule: ethers.constants.AddressZero,
        referenceModuleInitData: [],
      };

      try {
        const tx = await hubContract?.post(postStruct);
        await tx?.wait();

        console.log(tx);
      } catch (error) {
        console.error({ error });
      }

      setIsLoading(false);
      console.log(asset.downloadUrl);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  if (isLoading) {
    return <h2>Uploading</h2>;
  }

  return (
    <div>
      <div className="flex flex-col justify-center w-full">
        <div className="text-lg bold">Create post</div>
        <div>
          <div className="w-full max-w-s form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              className="w-full max-w-s input input-bordered"
              type="text"
              placeholder="e.g. Cool episode about lens API being down..."
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div className="w-full max-w-s form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              className="w-full max-w-xs input input-bordered"
              type="text"
              placeholder="e.g. Long, long ago... in a far away lorem ipsum dolor sit amet..."
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </div>
          <button className="mt-2 btn" onClick={() => uploadVideo()}>
            Upload episode
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* {videoUrl && (
            <div className="shadow-xl card bg-base-100">
              <figure>
                <ReactPlayer url={videoUrl} controls={true} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Lex Fridman Podcast</h2>
                <p>Hello!</p>
                <div className="justify-end card-actions">
                  <button className="btn btn-primary">Follow</button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
