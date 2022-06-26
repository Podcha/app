import { useState } from "react";
import { videonft } from "@livepeer/video-nft";
import ReactPlayer from "react-player";

export function TrendingListPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      let asset = await minter.api.createAsset("My NFT", file);
      asset = await minter.api.nftNormalize(asset);

      console.log(asset);

      const nftMetadata = {
        description: "My NFT description",
        traits: { "my-custom-trait": "my-custom-value" },
      };
      const ipfs = await minter.api.exportToIPFS(asset.id, nftMetadata);

      setVideoUrl(ipfs.videoFileGatewayUrl);
      // const tx = await minter.web3.mintNft(ipfs.nftMetadataUrl);
      // const nftInfo = await minter.web3.getMintedNftInfo(tx);
      // console.log(
      //   `minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`
      // );
      setIsLoading(false);
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
      <div className="flex w-full justify-center">
        <button
          className="border-solid border-2 border-black rounded p-1 mt-1"
          onClick={() => uploadVideo()}
        >
          Click here to mint NFT Video
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {videoUrl && (
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
        )}
      </div>
    </div>
  );
}
