import React, { useEffect } from "react";
import { defaultAbiCoder as abi } from "@ethersproject/abi";
import { keccak256 } from "@ethersproject/solidity";
import worldID from "@worldcoin/id";

const CONTRACT_ADDRESS = "0x32D59776E91fdb3F377755e12cEC05d9067c2B4F";

const hashBytes = (input: string) => {
  return abi.encode(
    ["uint256"],
    // eslint-disable-next-line no-undef
    [BigInt(keccak256(["bytes"], [input])) >> BigInt(8)]
  );
};
/* @ts-ignore */
export const WorldIDComponent = ({ signal, setProof }) => {
  const enableWorldID = async () => {
    try {
      const result = await worldID.enable();
      setProof(result);
      console.log("World ID verified successfully: ", result);
    } catch (error) {
      console.error(error);
      enableWorldID().catch(console.error.bind(console));
    }
  };
  useEffect(() => {
    if (!worldID.isInitialized()) {
      worldID.init("world-id-container", {
        /* @ts-ignore */
        actionId: hashBytes(CONTRACT_ADDRESS),
        signal,
      });
    }
    if (!worldID.isEnabled()) {
      enableWorldID().catch(console.error.bind(console));
    }
  }, [enableWorldID, signal]);
  return <div id="world-id-container" />;
};
