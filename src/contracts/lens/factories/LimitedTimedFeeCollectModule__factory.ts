/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  LimitedTimedFeeCollectModule,
  LimitedTimedFeeCollectModuleInterface,
} from "../LimitedTimedFeeCollectModule";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "hub",
        type: "address",
      },
      {
        internalType: "address",
        name: "moduleGlobals",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CollectExpired",
    type: "error",
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
    name: "MintLimitExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "ModuleDataMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "NotHub",
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
    inputs: [],
    name: "MODULE_GLOBALS",
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
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
    ],
    name: "getPublicationData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "collectLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentCollects",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "referralFee",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "followerOnly",
            type: "bool",
          },
          {
            internalType: "uint40",
            name: "endTimestamp",
            type: "uint40",
          },
        ],
        internalType: "struct ProfilePublicationData",
        name: "",
        type: "tuple",
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
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "initializePublicationCollectModule",
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
        name: "referrerProfileId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "collector",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "processCollect",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b506040516200163438038062001634833981016040819052620000349162000131565b81816001600160a01b0381166200005e576040516348be0eb360e01b815260040160405180910390fd5b6001600160a01b03811660808190526040514281527f4e84a529f4c627b5e787037d117873af1018768804cca3c7f0d47041fe2c89ed9060200160405180910390a2506001600160a01b038116620000c9576040516348be0eb360e01b815260040160405180910390fd5b6001600160a01b03811660a08190526040514281527ff1a1fa6b64aa95186f5a1285e76198d0da80d9c5a88062641d447f1d7c54e56c9060200160405180910390a250505062000169565b80516001600160a01b03811681146200012c57600080fd5b919050565b600080604083850312156200014557600080fd5b620001508362000114565b9150620001606020840162000114565b90509250929050565b60805160a05161146d620001c76000396000818161019e01528181610202015281816105010152818161070501528181610823015281816109310152610baf01526000818161015f015281816106790152610cf2015261146d6000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80633f5038921461005c57806388ffe8511461015a578063a4c52b8614610199578063c233f951146101c0578063e49c3dda146101e0575b600080fd5b61014461006a36600461101b565b6040805161010081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081019190915250600091825260208281526040808420928452918152918190208151610100810183528154815260018201549381019390935260028101549183019190915260038101546001600160a01b0390811660608401526004909101549081166080830152600160a01b810461ffff1660a0830152600160b01b810460ff16151560c0830152600160b81b900464ffffffffff1660e082015290565b604051610151919061103d565b60405180910390f35b6101817f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610151565b6101817f000000000000000000000000000000000000000000000000000000000000000081565b6101d36101ce366004611102565b6101f5565b60405161015191906111ad565b6101f36101ee3660046111d8565b6104f6565b005b6060336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610240576040516313bd2e8360e31b815260040160405180910390fd5b42620151800160008080808080610259898b018b611269565b955095509550955095509550856000148061027a575061027884610657565b155b8061028c57506001600160a01b038316155b8061029c575061271061ffff8316115b806102a5575084155b156102c3576040516348be0eb360e01b815260040160405180910390fd5b856000808e815260200190815260200160002060008d815260200190815260200160002060000181905550846000808e815260200190815260200160002060008d815260200190815260200160002060020181905550836000808e815260200190815260200160002060008d815260200190815260200160002060030160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550826000808e815260200190815260200160002060008d815260200190815260200160002060040160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550816000808e815260200190815260200160002060008d815260200190815260200160002060040160146101000a81548161ffff021916908361ffff160217905550806000808e815260200190815260200160002060008d815260200190815260200160002060040160166101000a81548160ff021916908315150217905550866000808e815260200190815260200160002060008d815260200190815260200160002060040160176101000a81548164ffffffffff021916908364ffffffffff1602179055508585858585858c6040516020016104d6979695949392919096875260208701959095526001600160a01b03938416604087015291909216606085015261ffff919091166080840152151560a083015264ffffffffff1660c082015260e00190565b604051602081830303815290604052975050505050505050949350505050565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461053f576040516313bd2e8360e31b815260040160405180910390fd5b600084815260208181526040808320868452909152902060040154600160b01b900460ff16156105735761057384866106ec565b600084815260208181526040808320868452909152902060040154600160b81b900464ffffffffff16428110156105bd576040516304cd703960e51b815260040160405180910390fd5b60008581526020818152604080832087845290915290208054600190910154106105fa57604051635b21dfd360e11b815260040160405180910390fd5b60008581526020818152604080832087845290915281206001018054909190610622906112ef565b90915550868514156106405761063b86868686866109ee565b61064e565b61064e878787878787610ac6565b50505050505050565b6040516343b938c560e01b81526001600160a01b0382811660048301526000917f0000000000000000000000000000000000000000000000000000000000000000909116906343b938c590602401602060405180830381865afa1580156106c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e6919061130a565b92915050565b604051633648f48360e21b8152600481018390526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063d923d20c90602401602060405180830381865afa158015610754573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107789190611327565b905060006001600160a01b0382161561080a576040516311470f4360e21b8152600481018590526001600160a01b0384811660248301526000604483015283169063451c3d0c90606401602060405180830381865afa1580156107df573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610803919061130a565b905061091c565b60405163a9ec656360e01b8152600481018590526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9ec656390602401602060405180830381865afa158015610872573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108969190611327565b90506001600160a01b0381161580159061091857506040516370a0823160e01b81526001600160a01b0385811660048301528216906370a0823190602401602060405180830381865afa1580156108f1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109159190611344565b15155b9150505b801580156109ca5750826001600160a01b03167f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636352211e866040518263ffffffff1660e01b815260040161097d91815260200190565b602060405180830381865afa15801561099a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109be9190611327565b6001600160a01b031614155b156109e857604051636992d36b60e11b815260040160405180910390fd5b50505050565b600084815260208181526040808320868452909152902060028101546003909101546001600160a01b0316610a2584848385610c93565b600080610a30610ced565b60008a8152602081815260408083208c84529091528120600401549294509092506001600160a01b0390911690612710610a6e61ffff85168861135d565b610a78919061137c565b90506000610a86828861139e565b9050610a9d6001600160a01b0387168d8584610d79565b8115610ab857610ab86001600160a01b0387168d8785610d79565b505050505050505050505050565b600084815260208181526040808320868452909152902060028101546003909101546001600160a01b0316610afd84848385610c93565b600086815260208181526040808320888452909152812060040154600160a01b900461ffff16908080610b2e610ced565b9093509050612710610b4461ffff83168861135d565b610b4e919061137c565b915060009050610b5e828761139e565b90508315610c34576000612710610b75868461135d565b610b7f919061137c565b9050610b8b818361139e565b6040516331a9108f60e11b8152600481018f90529092506000906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690636352211e90602401602060405180830381865afa158015610bf6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c1a9190611327565b9050610c316001600160a01b0388168e8385610d79565b50505b60008a8152602081815260408083208c84529091529020600401546001600160a01b0390811690610c699087168d8385610d79565b8215610c8457610c846001600160a01b0387168d8686610d79565b50505050505050505050505050565b600080610ca2858701876113b5565b915091508281141580610cc75750836001600160a01b0316826001600160a01b031614155b15610ce5576040516346308bd560e01b815260040160405180910390fd5b505050505050565b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166398f965d16040518163ffffffff1660e01b81526004016040805180830381865afa158015610d4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d7191906113e1565b915091509091565b604080516001600160a01b038581166024830152848116604483015260648083018590528351808403909101815260849092018352602080830180516001600160e01b03166323b872dd60e01b17905283518085019094528084527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564908401526109e892879291600091610e11918516908490610e98565b805190915015610e935780806020019051810190610e2f919061130a565b610e935760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084015b60405180910390fd5b505050565b6060610ea78484600085610eb1565b90505b9392505050565b606082471015610f125760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610e8a565b6001600160a01b0385163b610f695760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610e8a565b600080866001600160a01b03168587604051610f85919061141b565b60006040518083038185875af1925050503d8060008114610fc2576040519150601f19603f3d011682016040523d82523d6000602084013e610fc7565b606091505b5091509150610fd7828286610fe2565b979650505050505050565b60608315610ff1575081610eaa565b8251156110015782518084602001fd5b8160405162461bcd60e51b8152600401610e8a91906111ad565b6000806040838503121561102e57600080fd5b50508035926020909101359150565b600061010082019050825182526020830151602083015260408301516040830152606083015160018060a01b038082166060850152806080860151166080850152505061ffff60a08401511660a083015260c0830151151560c083015260e08301516110b260e084018264ffffffffff169052565b5092915050565b60008083601f8401126110cb57600080fd5b50813567ffffffffffffffff8111156110e357600080fd5b6020830191508360208285010111156110fb57600080fd5b9250929050565b6000806000806060858703121561111857600080fd5b8435935060208501359250604085013567ffffffffffffffff81111561113d57600080fd5b611149878288016110b9565b95989497509550505050565b60005b83811015611170578181015183820152602001611158565b838111156109e85750506000910152565b60008151808452611199816020860160208601611155565b601f01601f19169290920160200192915050565b602081526000610eaa6020830184611181565b6001600160a01b03811681146111d557600080fd5b50565b60008060008060008060a087890312156111f157600080fd5b863595506020870135611203816111c0565b94506040870135935060608701359250608087013567ffffffffffffffff81111561122d57600080fd5b61123989828a016110b9565b979a9699509497509295939492505050565b61ffff811681146111d557600080fd5b80151581146111d557600080fd5b60008060008060008060c0878903121561128257600080fd5b8635955060208701359450604087013561129b816111c0565b935060608701356112ab816111c0565b925060808701356112bb8161124b565b915060a08701356112cb8161125b565b809150509295509295509295565b634e487b7160e01b600052601160045260246000fd5b6000600019821415611303576113036112d9565b5060010190565b60006020828403121561131c57600080fd5b8151610eaa8161125b565b60006020828403121561133957600080fd5b8151610eaa816111c0565b60006020828403121561135657600080fd5b5051919050565b6000816000190483118215151615611377576113776112d9565b500290565b60008261139957634e487b7160e01b600052601260045260246000fd5b500490565b6000828210156113b0576113b06112d9565b500390565b600080604083850312156113c857600080fd5b82356113d3816111c0565b946020939093013593505050565b600080604083850312156113f457600080fd5b82516113ff816111c0565b60208401519092506114108161124b565b809150509250929050565b6000825161142d818460208701611155565b919091019291505056fea2646970667358221220481b54689b42af0ccde8a056f38714ffe01e1595ba00e3919be4709ca919e2e264736f6c634300080a0033";

type LimitedTimedFeeCollectModuleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LimitedTimedFeeCollectModuleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LimitedTimedFeeCollectModule__factory extends ContractFactory {
  constructor(...args: LimitedTimedFeeCollectModuleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    hub: string,
    moduleGlobals: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LimitedTimedFeeCollectModule> {
    return super.deploy(
      hub,
      moduleGlobals,
      overrides || {}
    ) as Promise<LimitedTimedFeeCollectModule>;
  }
  getDeployTransaction(
    hub: string,
    moduleGlobals: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(hub, moduleGlobals, overrides || {});
  }
  attach(address: string): LimitedTimedFeeCollectModule {
    return super.attach(address) as LimitedTimedFeeCollectModule;
  }
  connect(signer: Signer): LimitedTimedFeeCollectModule__factory {
    return super.connect(signer) as LimitedTimedFeeCollectModule__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LimitedTimedFeeCollectModuleInterface {
    return new utils.Interface(_abi) as LimitedTimedFeeCollectModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LimitedTimedFeeCollectModule {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as LimitedTimedFeeCollectModule;
  }
}