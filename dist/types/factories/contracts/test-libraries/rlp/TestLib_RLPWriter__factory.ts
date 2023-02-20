/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  TestLib_RLPWriter,
  TestLib_RLPWriterInterface,
} from "../../../../contracts/test-libraries/rlp/TestLib_RLPWriter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_in",
        type: "address",
      },
    ],
    name: "writeAddress",
    outputs: [
      {
        internalType: "bytes",
        name: "_out",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_in",
        type: "address",
      },
    ],
    name: "writeAddressWithTaintedMemory",
    outputs: [
      {
        internalType: "bytes",
        name: "_out",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_in",
        type: "bool",
      },
    ],
    name: "writeBool",
    outputs: [
      {
        internalType: "bytes",
        name: "_out",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_in",
        type: "bytes",
      },
    ],
    name: "writeBytes",
    outputs: [
      {
        internalType: "bytes",
        name: "_out",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "_in",
        type: "bytes[]",
      },
    ],
    name: "writeList",
    outputs: [
      {
        internalType: "bytes",
        name: "_out",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_in",
        type: "string",
      },
    ],
    name: "writeString",
    outputs: [
      {
        internalType: "bytes",
        name: "_out",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_in",
        type: "uint256",
      },
    ],
    name: "writeUint",
    outputs: [
      {
        internalType: "bytes",
        name: "_out",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611e14806100206000396000f3fe60806040523480156200001157600080fd5b5060043610620000875760003560e01c80637932db7511620000625780637932db7514620000e957806397563ac814620001005780639e5c65b71462000117578063dd206202146200012e57600080fd5b80633c5cee26146200008c5780633cbd171214620000bb5780635e25d23f14620000d2575b600080fd5b620000a36200009d3660046200093a565b62000145565b604051620000b2919062000991565b60405180910390f35b620000a3620000cc366004620009e4565b62000158565b620000a3620000e3366004620009fe565b62000165565b620000a3620000fa36600462000b56565b62000172565b620000a362000111366004620009fe565b6200017f565b620000a36200012836600462000b97565b620001b9565b620000a36200013f36600462000c68565b620001c6565b60606200015282620001d3565b92915050565b6060620001528262000292565b60606200015282620002a9565b60606200015282620002f1565b60606040516200018f906200092c565b604051809103906000f080158015620001ac573d6000803e3d6000fd5b50506200015282620002a9565b606062000152826200036a565b6060620001528262000172565b604080516001808252818301909252606091600091906020820181803683370190505090508262000225577f800000000000000000000000000000000000000000000000000000000000000062000247565b7f01000000000000000000000000000000000000000000000000000000000000005b816000815181106200025d576200025d62000cb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535092915050565b606062000152620002a383620003b4565b620002f1565b604051606082811b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000001660208301529062000152906034016040516020818303038152906040525b6060808251600114801562000323575060808360008151811062000319576200031962000cb6565b016020015160f81c105b156200033157508162000152565b6200033f835160806200053b565b836040516020016200035392919062000ce5565b604051602081830303815290604052905092915050565b6060600062000379836200075d565b905062000389815160c06200053b565b816040516020016200039d92919062000ce5565b604051602081830303815290604052915050919050565b6060600082604051602001620003cc91815260200190565b604051602081830303815290604052905060005b60208110156200044757818181518110620003ff57620003ff62000cb6565b01602001517fff000000000000000000000000000000000000000000000000000000000000001615620004325762000447565b806200043e8162000d47565b915050620003e0565b60006200045682602062000d83565b67ffffffffffffffff81111562000471576200047162000a36565b6040519080825280601f01601f1916602001820160405280156200049c576020820181803683370190505b50905060005b815181101562000532578383620004b98162000d47565b945081518110620004ce57620004ce62000cb6565b602001015160f81c60f81b828281518110620004ee57620004ee62000cb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535080620005298162000d47565b915050620004a2565b50949350505050565b6060806038841015620005c1576040805160018082528183019092529060208201818036833701905050905062000573838562000d9d565b60f81b816000815181106200058c576200058c62000cb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535062000756565b600060015b620005d2818762000df4565b15620005fe5781620005e48162000d47565b9250620005f690506101008262000e0b565b9050620005c6565b6200060b82600162000e4b565b67ffffffffffffffff81111562000626576200062662000a36565b6040519080825280601f01601f19166020018201604052801562000651576020820181803683370190505b50925062000660858362000d9d565b6200066d90603762000d9d565b60f81b8360008151811062000686576200068662000cb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600190505b8181116200075357610100620006d1828462000d83565b620006df9061010062000f9f565b620006eb908862000df4565b620006f7919062000fad565b60f81b8382815181106200070f576200070f62000cb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350806200074a8162000d47565b915050620006ba565b50505b9392505050565b60608151600014156200077e57505060408051600081526020810190915290565b6000805b8351811015620007ce57838181518110620007a157620007a162000cb6565b60200260200101515182620007b7919062000e4b565b915080620007c58162000d47565b91505062000782565b60008267ffffffffffffffff811115620007ec57620007ec62000a36565b6040519080825280601f01601f19166020018201604052801562000817576020820181803683370190505b50600092509050602081015b85518310156200053257600086848151811062000844576200084462000cb6565b6020026020010151905060006020820190506200086483828451620008a9565b87858151811062000879576200087962000cb6565b602002602001015151836200088f919062000e4b565b925050508280620008a09062000d47565b93505062000823565b8282825b60208110620008ed5781518352620008c760208462000e4b565b9250620008d660208362000e4b565b9150620008e560208262000d83565b9050620008ad565b905182516020929092036101000a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0180199091169116179052505050565b610e1a8062000fc583390190565b6000602082840312156200094d57600080fd5b813580151581146200075657600080fd5b60005b838110156200097b57818101518382015260200162000961565b838111156200098b576000848401525b50505050565b6020815260008251806020840152620009b28160408501602087016200095e565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b600060208284031215620009f757600080fd5b5035919050565b60006020828403121562000a1157600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146200075657600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171562000aaf5762000aaf62000a36565b604052919050565b600067ffffffffffffffff83111562000ad45762000ad462000a36565b62000b0760207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8601160162000a65565b905082815283838301111562000b1c57600080fd5b828260208301376000602084830101529392505050565b600082601f83011262000b4557600080fd5b620007568383356020850162000ab7565b60006020828403121562000b6957600080fd5b813567ffffffffffffffff81111562000b8157600080fd5b62000b8f8482850162000b33565b949350505050565b6000602080838503121562000bab57600080fd5b823567ffffffffffffffff8082111562000bc457600080fd5b818501915085601f83011262000bd957600080fd5b81358181111562000bee5762000bee62000a36565b8060051b62000bff85820162000a65565b918252838101850191858101908984111562000c1a57600080fd5b86860192505b8383101562000c5b5782358581111562000c3a5760008081fd5b62000c4a8b89838a010162000b33565b835250918601919086019062000c20565b9998505050505050505050565b60006020828403121562000c7b57600080fd5b813567ffffffffffffffff81111562000c9357600080fd5b8201601f8101841362000ca557600080fd5b62000b8f8482356020840162000ab7565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000835162000cf98184602088016200095e565b83519083019062000d0f8183602088016200095e565b01949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141562000d7c5762000d7c62000d18565b5060010190565b60008282101562000d985762000d9862000d18565b500390565b600060ff821660ff84168060ff0382111562000dbd5762000dbd62000d18565b019392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60008262000e065762000e0662000dc5565b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161562000e465762000e4662000d18565b500290565b6000821982111562000e615762000e6162000d18565b500190565b600181815b8085111562000ec557817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0482111562000ea95762000ea962000d18565b8085161562000eb757918102915b93841c939080029062000e6b565b509250929050565b60008262000ede5750600162000152565b8162000eed5750600062000152565b816001811462000f06576002811462000f115762000f31565b600191505062000152565b60ff84111562000f255762000f2562000d18565b50506001821b62000152565b5060208310610133831016604e8410600b841016171562000f56575081810a62000152565b62000f62838362000e66565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0482111562000f975762000f9762000d18565b029392505050565b600062000756838362000ecd565b60008262000fbf5762000fbf62000dc5565b50069056fe60806040523480156200001157600080fd5b5060405180604001604052806004815260200163151154d560e21b815250604051806040016040528060038152602001621514d560ea1b81525081600390805190602001906200006392919062000082565b5080516200007990600490602084019062000082565b50505062000165565b828054620000909062000128565b90600052602060002090601f016020900481019282620000b45760008555620000ff565b82601f10620000cf57805160ff1916838001178555620000ff565b82800160010185558215620000ff579182015b82811115620000ff578251825591602001919060010190620000e2565b506200010d92915062000111565b5090565b5b808211156200010d576000815560010162000112565b600181811c908216806200013d57607f821691505b602082108114156200015f57634e487b7160e01b600052602260045260246000fd5b50919050565b610ca580620001756000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c806340c10f1911610081578063a457c2d71161005b578063a457c2d7146101b4578063a9059cbb146101c7578063dd62ed3e146101da57600080fd5b806340c10f191461016157806370a082311461017657806395d89b41146101ac57600080fd5b806323b872dd116100b257806323b872dd1461012c578063313ce5671461013f578063395093511461014e57600080fd5b806306fdde03146100d9578063095ea7b3146100f757806318160ddd1461011a575b600080fd5b6100e1610220565b6040516100ee9190610a85565b60405180910390f35b61010a610105366004610b21565b6102b2565b60405190151581526020016100ee565b6002545b6040519081526020016100ee565b61010a61013a366004610b4b565b6102c8565b604051601281526020016100ee565b61010a61015c366004610b21565b6103b3565b61017461016f366004610b21565b6103fc565b005b61011e610184366004610b87565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6100e161040a565b61010a6101c2366004610b21565b610419565b61010a6101d5366004610b21565b6104f1565b61011e6101e8366004610ba9565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b60606003805461022f90610bdc565b80601f016020809104026020016040519081016040528092919081815260200182805461025b90610bdc565b80156102a85780601f1061027d576101008083540402835291602001916102a8565b820191906000526020600020905b81548152906001019060200180831161028b57829003601f168201915b5050505050905090565b60006102bf3384846104fe565b50600192915050565b60006102d58484846106b1565b73ffffffffffffffffffffffffffffffffffffffff841660009081526001602090815260408083203384529091529020548281101561039b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6103a885338584036104fe565b506001949350505050565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490916102bf9185906103f7908690610c30565b6104fe565b6104068282610965565b5050565b60606004805461022f90610bdc565b33600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff86168452909152812054828110156104da576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610392565b6104e733858584036104fe565b5060019392505050565b60006102bf3384846106b1565b73ffffffffffffffffffffffffffffffffffffffff83166105a0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610392565b73ffffffffffffffffffffffffffffffffffffffff8216610643576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610392565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316610754576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610392565b73ffffffffffffffffffffffffffffffffffffffff82166107f7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610392565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260208190526040902054818110156108ad576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610392565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152602081905260408082208585039055918516815290812080548492906108f1908490610c30565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161095791815260200190565b60405180910390a350505050565b73ffffffffffffffffffffffffffffffffffffffff82166109e2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610392565b80600260008282546109f49190610c30565b909155505073ffffffffffffffffffffffffffffffffffffffff821660009081526020819052604081208054839290610a2e908490610c30565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600060208083528351808285015260005b81811015610ab257858101830151858201604001528201610a96565b81811115610ac4576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610b1c57600080fd5b919050565b60008060408385031215610b3457600080fd5b610b3d83610af8565b946020939093013593505050565b600080600060608486031215610b6057600080fd5b610b6984610af8565b9250610b7760208501610af8565b9150604084013590509250925092565b600060208284031215610b9957600080fd5b610ba282610af8565b9392505050565b60008060408385031215610bbc57600080fd5b610bc583610af8565b9150610bd360208401610af8565b90509250929050565b600181811c90821680610bf057607f821691505b60208210811415610c2a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60008219821115610c6a577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b50019056fea2646970667358221220f3c9bd0d178c1caf86b568953e939f88c1359fddf4d15fbcdda4e985e85d761864736f6c63430008090033a2646970667358221220866bf762e8cf930125ba0c08219443e878cc0661241c6fd7720870f1decc6e2564736f6c63430008090033";

type TestLib_RLPWriterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestLib_RLPWriterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestLib_RLPWriter__factory extends ContractFactory {
  constructor(...args: TestLib_RLPWriterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestLib_RLPWriter> {
    return super.deploy(overrides || {}) as Promise<TestLib_RLPWriter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestLib_RLPWriter {
    return super.attach(address) as TestLib_RLPWriter;
  }
  override connect(signer: Signer): TestLib_RLPWriter__factory {
    return super.connect(signer) as TestLib_RLPWriter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestLib_RLPWriterInterface {
    return new utils.Interface(_abi) as TestLib_RLPWriterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestLib_RLPWriter {
    return new Contract(address, _abi, signerOrProvider) as TestLib_RLPWriter;
  }
}
