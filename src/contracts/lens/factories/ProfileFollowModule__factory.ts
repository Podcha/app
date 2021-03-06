/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ProfileFollowModule,
  ProfileFollowModuleInterface,
} from "../ProfileFollowModule";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "hub",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FollowInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "InitParamsInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "NotHub",
    type: "error",
  },
  {
    inputs: [],
    name: "NotProfileOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "HUB",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "followNFTTokenId",
        type: "uint256",
      },
    ],
    name: "followModuleTransferHook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "initializeFollowModule",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "follower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "followNFTTokenId",
        type: "uint256",
      },
    ],
    name: "isFollowing",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "follower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "processFollow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161085438038061085483398101604081905261002f916100a0565b806001600160a01b038116610057576040516348be0eb360e01b815260040160405180910390fd5b6001600160a01b03811660808190526040514281527ff1a1fa6b64aa95186f5a1285e76198d0da80d9c5a88062641d447f1d7c54e56c9060200160405180910390a250506100d0565b6000602082840312156100b257600080fd5b81516001600160a01b03811681146100c957600080fd5b9392505050565b60805161074e6101066000396000818160d20152818161011701528181610171015281816102c50152610452015261074e6000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80630e096ae11461005c5780633cb22cc414610071578063451c3d0c146100855780639713958a146100ad578063a4c52b86146100cd575b600080fd5b61006f61006a36600461054c565b61010c565b005b61006f61007f3660046105a8565b50505050565b6100986100933660046105f0565b6102a2565b60405190151581526020015b60405180910390f35b6100c06100bb366004610628565b610445565b6040516100a49190610674565b6100f47f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016100a4565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610155576040516313bd2e8360e31b815260040160405180910390fd5b6000610163828401846106c9565b9050846001600160a01b03167f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636352211e836040518263ffffffff1660e01b81526004016101bd91815260200190565b602060405180830381865afa1580156101da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101fe91906106e2565b6001600160a01b0316146102255760405163f194fae560e01b815260040160405180910390fd5b60008481526001602090815260408083205483835281842081855283528184208585529092529091205460ff161561027057604051636992d36b60e11b815260040160405180910390fd5b60008581526020818152604080832084845282528083208584529091529020805460ff19166001179055505050505050565b60405163a9ec656360e01b81526004810184905260009081906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063a9ec656390602401602060405180830381865afa15801561030c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061033091906106e2565b90506001600160a01b03811661034a57600091505061043e565b82156103cd576040516331a9108f60e11b8152600481018490526001600160a01b038086169190831690636352211e90602401602060405180830381865afa15801561039a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103be91906106e2565b6001600160a01b03161461043a565b6040516370a0823160e01b81526001600160a01b0385811660048301528216906370a0823190602401602060405180830381865afa158015610413573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061043791906106ff565b15155b9150505b9392505050565b6060336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610490576040516313bd2e8360e31b815260040160405180910390fd5b61049c828401846106c9565b600085815260016020908152604091829020929092558051601f850183900483028101830190915283815290849084908190840183828082843760009201919091525092979650505050505050565b6001600160a01b038116811461050057600080fd5b50565b60008083601f84011261051557600080fd5b50813567ffffffffffffffff81111561052d57600080fd5b60208301915083602082850101111561054557600080fd5b9250929050565b6000806000806060858703121561056257600080fd5b843561056d816104eb565b935060208501359250604085013567ffffffffffffffff81111561059057600080fd5b61059c87828801610503565b95989497509550505050565b600080600080608085870312156105be57600080fd5b8435935060208501356105d0816104eb565b925060408501356105e0816104eb565b9396929550929360600135925050565b60008060006060848603121561060557600080fd5b833592506020840135610617816104eb565b929592945050506040919091013590565b60008060006040848603121561063d57600080fd5b83359250602084013567ffffffffffffffff81111561065b57600080fd5b61066786828701610503565b9497909650939450505050565b600060208083528351808285015260005b818110156106a157858101830151858201604001528201610685565b818111156106b3576000604083870101525b50601f01601f1916929092016040019392505050565b6000602082840312156106db57600080fd5b5035919050565b6000602082840312156106f457600080fd5b815161043e816104eb565b60006020828403121561071157600080fd5b505191905056fea2646970667358221220a2a7cd08a8a1410db26aafaaf5f11055f872ff39728f378872b3260c9c822b1064736f6c634300080a0033";

type ProfileFollowModuleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProfileFollowModuleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProfileFollowModule__factory extends ContractFactory {
  constructor(...args: ProfileFollowModuleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    hub: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ProfileFollowModule> {
    return super.deploy(hub, overrides || {}) as Promise<ProfileFollowModule>;
  }
  getDeployTransaction(
    hub: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(hub, overrides || {});
  }
  attach(address: string): ProfileFollowModule {
    return super.attach(address) as ProfileFollowModule;
  }
  connect(signer: Signer): ProfileFollowModule__factory {
    return super.connect(signer) as ProfileFollowModule__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProfileFollowModuleInterface {
    return new utils.Interface(_abi) as ProfileFollowModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProfileFollowModule {
    return new Contract(address, _abi, signerOrProvider) as ProfileFollowModule;
  }
}
