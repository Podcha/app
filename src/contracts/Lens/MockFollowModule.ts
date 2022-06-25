/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface MockFollowModuleInterface extends utils.Interface {
  functions: {
    "followModuleTransferHook(uint256,address,address,uint256)": FunctionFragment;
    "initializeFollowModule(uint256,bytes)": FunctionFragment;
    "isFollowing(uint256,address,uint256)": FunctionFragment;
    "processFollow(address,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "followModuleTransferHook",
    values: [BigNumberish, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initializeFollowModule",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isFollowing",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "processFollow",
    values: [string, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "followModuleTransferHook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializeFollowModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isFollowing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "processFollow",
    data: BytesLike
  ): Result;

  events: {};
}

export interface MockFollowModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MockFollowModuleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    followModuleTransferHook(
      profileId: BigNumberish,
      from: string,
      to: string,
      followNFTTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initializeFollowModule(
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isFollowing(
      profileId: BigNumberish,
      follower: string,
      followNFTTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    processFollow(
      follower: string,
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  followModuleTransferHook(
    profileId: BigNumberish,
    from: string,
    to: string,
    followNFTTokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initializeFollowModule(
    profileId: BigNumberish,
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  isFollowing(
    profileId: BigNumberish,
    follower: string,
    followNFTTokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  processFollow(
    follower: string,
    profileId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    followModuleTransferHook(
      profileId: BigNumberish,
      from: string,
      to: string,
      followNFTTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    initializeFollowModule(
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    isFollowing(
      profileId: BigNumberish,
      follower: string,
      followNFTTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    processFollow(
      follower: string,
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    followModuleTransferHook(
      profileId: BigNumberish,
      from: string,
      to: string,
      followNFTTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initializeFollowModule(
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isFollowing(
      profileId: BigNumberish,
      follower: string,
      followNFTTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    processFollow(
      follower: string,
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    followModuleTransferHook(
      profileId: BigNumberish,
      from: string,
      to: string,
      followNFTTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initializeFollowModule(
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isFollowing(
      profileId: BigNumberish,
      follower: string,
      followNFTTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    processFollow(
      follower: string,
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
