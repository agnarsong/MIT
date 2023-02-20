/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  StateCommitmentChain,
  StateCommitmentChainInterface,
} from "../../../../contracts/L1/rollup/StateCommitmentChain";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_libAddressManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_l1messenger",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_fraudProofWindow",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sequencerPublishWindow",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_startBlockNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_length",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_batchTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "_tssMembers",
        type: "address[]",
      },
    ],
    name: "DistributeTssReward",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_startBlockNumber",
        type: "uint256",
      },
    ],
    name: "RollBackL2Chain",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_batchIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_batchRoot",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_batchSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_prevTotalElements",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "StateBatchAppended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_batchIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_batchRoot",
        type: "bytes32",
      },
    ],
    name: "StateBatchDeleted",
    type: "event",
  },
  {
    inputs: [],
    name: "FRAUD_PROOF_WINDOW",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SEQUENCER_PUBLISH_WINDOW",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "_batch",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "_shouldStartAtElement",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "appendStateBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "batches",
    outputs: [
      {
        internalType: "contract IChainStorageContainer",
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
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct Lib_BVMCodec.ChainBatchHeader",
        name: "_batchHeader",
        type: "tuple",
      },
    ],
    name: "deleteStateBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastSequencerTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "_lastSequencerTimestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalBatches",
    outputs: [
      {
        internalType: "uint256",
        name: "_totalBatches",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalElements",
    outputs: [
      {
        internalType: "uint256",
        name: "_totalElements",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct Lib_BVMCodec.ChainBatchHeader",
        name: "_batchHeader",
        type: "tuple",
      },
    ],
    name: "insideFraudProofWindow",
    outputs: [
      {
        internalType: "bool",
        name: "_inside",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "libAddressManager",
    outputs: [
      {
        internalType: "contract Lib_AddressManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "messenger",
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
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "resolve",
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
        name: "_shouldRollBack",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_shouldStartAtElement",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "rollBackL2Chain",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fraudProofWindow",
        type: "uint256",
      },
    ],
    name: "setFraudProofWindow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_element",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct Lib_BVMCodec.ChainBatchHeader",
        name: "_batchHeader",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "siblings",
            type: "bytes32[]",
          },
        ],
        internalType: "struct Lib_BVMCodec.ChainInclusionProof",
        name: "_proof",
        type: "tuple",
      },
    ],
    name: "verifyStateCommitment",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002d1938038062002d19833981016040819052620000349162000090565b600080546001600160a01b039586166001600160a01b0319918216179091556001805494909516931692909217909255600291909155600355620000d8565b80516001600160a01b03811681146200008b57600080fd5b919050565b60008060008060808587031215620000a757600080fd5b620000b28562000073565b9350620000c26020860162000073565b6040860151606090960151949790965092505050565b612c3180620000e86000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80637ad168a011610097578063b768bb1711610066578063b768bb171461020f578063c17b291b14610222578063cfdf677e1461022b578063e561dddc1461023357600080fd5b80637ad168a0146101c857806381eb62ef146101d057806389a1d980146101d9578063ab59f7b8146101fc57600080fd5b80633cb747bf116100d35780633cb747bf1461016c578063461a44781461018c5780635b4d90e21461019f5780637aa63a86146101b257600080fd5b80630bf3b5f2146100fa5780632169f79f1461010f578063299ca47814610122575b600080fd5b61010d6101083660046123e3565b61023b565b005b61010d61011d3660046124c2565b61041a565b6000546101429073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6001546101429073ffffffffffffffffffffffffffffffffffffffff1681565b61014261019a366004612525565b610825565b61010d6101ad36600461260d565b6108d2565b6101ba610a8e565b604051908152602001610163565b6101ba610aa7565b6101ba60035481565b6101ec6101e736600461260d565b610ac0565b6040519015158152602001610163565b61010d61020a366004612642565b610b68565b6101ec61021d36600461265b565b610cbc565b6101ba60025481565b610142610d86565b6101ba610dae565b610243610a8e565b82146102bc5760405162461bcd60e51b815260206004820152603d60248201527f41637475616c20626174636820737461727420696e64657820646f6573206e6f60448201527f74206d6174636820657870656374656420737461727420696e6465782e00000060648201526084015b60405180910390fd5b6102fa6040518060400160405280600b81526020017f426f6e644d616e61676572000000000000000000000000000000000000000000815250610825565b6040517f02ad4d2a00000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff91909116906302ad4d2a9060240160206040518083038186803b15801561036157600080fd5b505afa158015610375573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103999190612718565b61040b5760405162461bcd60e51b815260206004820152602f60248201527f50726f706f73657220646f6573206e6f74206861766520656e6f75676820636f60448201527f6c6c61746572616c20706f73746564000000000000000000000000000000000060648201526084016102b3565b6104158382610e35565b505050565b610422610a8e565b82146104965760405162461bcd60e51b815260206004820152603d60248201527f41637475616c20626174636820737461727420696e64657820646f6573206e6f60448201527f74206d6174636820657870656374656420737461727420696e6465782e00000060648201526084016102b3565b6104d46040518060400160405280600b81526020017f426f6e644d616e61676572000000000000000000000000000000000000000000815250610825565b6040517f02ad4d2a00000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff91909116906302ad4d2a9060240160206040518083038186803b15801561053b57600080fd5b505afa15801561054f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105739190612718565b6105e55760405162461bcd60e51b815260206004820152602f60248201527f50726f706f73657220646f6573206e6f74206861766520656e6f75676820636f60448201527f6c6c61746572616c20706f73746564000000000000000000000000000000000060648201526084016102b3565b600083511161065c5760405162461bcd60e51b815260206004820152602360248201527f43616e6e6f74207375626d697420616e20656d7074792073746174652062617460448201527f63682e000000000000000000000000000000000000000000000000000000000060648201526084016102b3565b61069a6040518060400160405280601981526020017f43616e6f6e6963616c5472616e73616374696f6e436861696e00000000000000815250610825565b73ffffffffffffffffffffffffffffffffffffffff16637aa63a866040518163ffffffff1660e01b815260040160206040518083038186803b1580156106df57600080fd5b505afa1580156106f3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610717919061273a565b8351610721610a8e565b61072b9190612782565b11156107c55760405162461bcd60e51b815260206004820152604960248201527f4e756d626572206f6620737461746520726f6f74732063616e6e6f742065786360448201527f65656420746865206e756d626572206f662063616e6f6e6963616c207472616e60648201527f73616374696f6e732e0000000000000000000000000000000000000000000000608482015260a4016102b3565b6107d0838383611034565b61081b8382423360405160200161080792919091825273ffffffffffffffffffffffffffffffffffffffff16602082015260400190565b604051602081830303815290604052611172565b6104158383611422565b600080546040517fbf40fac100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063bf40fac19061087c9085906004016127e7565b60206040518083038186803b15801561089457600080fd5b505afa1580156108a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108cc919061281c565b92915050565b6109106040518060400160405280601181526020017f42564d5f46726175645665726966696572000000000000000000000000000000815250610825565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109b05760405162461bcd60e51b815260206004820152603b60248201527f537461746520626174636865732063616e206f6e6c792062652064656c65746560448201527f64206279207468652042564d5f467261756456657269666965722e000000000060648201526084016102b3565b6109b981611639565b610a055760405162461bcd60e51b815260206004820152601560248201527f496e76616c6964206261746368206865616465722e000000000000000000000060448201526064016102b3565b610a0e81610ac0565b610a82576040805162461bcd60e51b81526020600482015260248101919091527f537461746520626174636865732063616e206f6e6c792062652064656c65746560448201527f642077697468696e207468652066726175642070726f6f662077696e646f772e60648201526084016102b3565b610a8b816116fb565b50565b600080610a9961192c565b5064ffffffffff1692915050565b600080610ab261192c565b64ffffffffff169392505050565b6000808260a00151806020019051810190610adb9190612839565b50905080610b515760405162461bcd60e51b815260206004820152602560248201527f4261746368206865616465722074696d657374616d702063616e6e6f7420626560448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084016102b3565b4260025482610b609190612782565b119392505050565b610ba66040518060400160405280600b81526020017f426f6e644d616e61676572000000000000000000000000000000000000000000815250610825565b6040517f02ad4d2a00000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff91909116906302ad4d2a9060240160206040518083038186803b158015610c0d57600080fd5b505afa158015610c21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c459190612718565b610cb75760405162461bcd60e51b815260206004820152602f60248201527f50726f706f73657220646f6573206e6f74206861766520656e6f75676820636f60448201527f6c6c61746572616c20706f73746564000000000000000000000000000000000060648201526084016102b3565b600255565b6000610cc783611639565b610d135760405162461bcd60e51b815260206004820152601560248201527f496e76616c6964206261746368206865616465722e000000000000000000000060448201526064016102b3565b610d308360200151858460000151856020015187604001516119d0565b610d7c5760405162461bcd60e51b815260206004820152601860248201527f496e76616c696420696e636c7573696f6e2070726f6f662e000000000000000060448201526064016102b3565b5060019392505050565b6000610da9604051806060016040528060218152602001612bdb60219139610825565b905090565b6000610db8610d86565b73ffffffffffffffffffffffffffffffffffffffff16631f7b6d326040518163ffffffff1660e01b815260040160206040518083038186803b158015610dfd57600080fd5b505afa158015610e11573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da9919061273a565b610e736040518060400160405280601781526020017f50726f78795f5f5453535f47726f75704d616e61676572000000000000000000815250610825565b73ffffffffffffffffffffffffffffffffffffffff16633231a7f083604051602001610ea191815260200190565b60405160208183030381529060405280519060200120836040518363ffffffff1660e01b8152600401610ed5929190612869565b602060405180830381600087803b158015610eef57600080fd5b505af1158015610f03573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f279190612718565b610f735760405162461bcd60e51b815260206004820152601760248201527f766572696679207369676e6174757265206661696c656400000000000000000060448201526064016102b3565b600082604051602401610f8891815260200190565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167ff523f40d00000000000000000000000000000000000000000000000000000000179052905061100473deaddeaddeaddeaddeaddeaddeaddeaddead2222621e848083611c3e565b60405183907f8ef5d07412def056f6bfc680f359c8a0370cfacb2becaf67d01e2e372e08964a90600090a2505050565b6110726040518060400160405280601781526020017f50726f78795f5f5453535f47726f75704d616e61676572000000000000000000815250610825565b73ffffffffffffffffffffffffffffffffffffffff16633231a7f084846040516020016110a0929190612882565b60405160208183030381529060405280519060200120836040518363ffffffff1660e01b81526004016110d4929190612869565b602060405180830381600087803b1580156110ee57600080fd5b505af1158015611102573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111269190612718565b6104155760405162461bcd60e51b815260206004820152601760248201527f766572696679207369676e6174757265206661696c656400000000000000000060448201526064016102b3565b60006111b26040518060400160405280600c81526020017f42564d5f50726f706f7365720000000000000000000000000000000000000000815250610825565b90506000806111bf61192c565b90925090503373ffffffffffffffffffffffffffffffffffffffff841614156111e9575042611298565b426003548264ffffffffff166111ff9190612782565b106112985760405162461bcd60e51b815260206004820152604360248201527f43616e6e6f74207075626c69736820737461746520726f6f747320776974686960448201527f6e207468652073657175656e636572207075626c69636174696f6e2077696e6460648201527f6f772e0000000000000000000000000000000000000000000000000000000000608482015260a4016102b3565b60006040518060c001604052806112ad610dae565b81526020016112bb89611ccf565b8152602001885181526020018464ffffffffff16815260200187815260200186815250905080600001517f9cf3ad24eae3fd6d461e2f566b35b95b6d671871d9fcb45f8ac8030e4a8d21b382602001518360400151846060015185608001518660a001516040516113309594939291906128ca565b60405180910390a2611340610d86565b73ffffffffffffffffffffffffffffffffffffffff16632015276c611364836121b3565b6113898460400151856060015161137b9190612782565b602887811b91909117901b90565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092527fffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000166024820152604401600060405180830381600087803b15801561140157600080fd5b505af1158015611415573d6000803e3d6000fd5b5050505050505050505050565b60006114626040518060400160405280601781526020017f50726f78795f5f5453535f47726f75704d616e61676572000000000000000000815250610825565b73ffffffffffffffffffffffffffffffffffffffff16632cd00d536040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156114a957600080fd5b505af11580156114bd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114e5919081019061290d565b905060008151116115385760405162461bcd60e51b815260206004820152601860248201527f67657420747373206d656d6265727320696e206572726f72000000000000000060448201526064016102b3565b82516040516000917f0fae75d90000000000000000000000000000000000000000000000000000000091611574918691429087906024016129f8565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff000000000000000000000000000000000000000000000000000000009093169290921790915290506115f7734200000000000000000000000000000000000020621e848083611c3e565b42837ff533ef50019763ee9d95ad46e28350b533c11edd472ae7be93e8fae83c1b6d9986518560405161162b929190612a27565b60405180910390a350505050565b6000611643610d86565b82516040517f9507d39a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9290921691639507d39a9161169b9160040190815260200190565b60206040518083038186803b1580156116b357600080fd5b505afa1580156116c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116eb919061273a565b6116f4836121b3565b1492915050565b611703610d86565b73ffffffffffffffffffffffffffffffffffffffff16631f7b6d326040518163ffffffff1660e01b815260040160206040518083038186803b15801561174857600080fd5b505afa15801561175c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611780919061273a565b8151106117cf5760405162461bcd60e51b815260206004820152601460248201527f496e76616c696420626174636820696e6465782e00000000000000000000000060448201526064016102b3565b6117d881611639565b6118245760405162461bcd60e51b815260206004820152601560248201527f496e76616c6964206261746368206865616465722e000000000000000000000060448201526064016102b3565b61182c610d86565b8151606083015173ffffffffffffffffffffffffffffffffffffffff929092169163167fd681919060281b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092527fffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000166024820152604401600060405180830381600087803b1580156118cf57600080fd5b505af11580156118e3573d6000803e3d6000fd5b5050505080600001517f8747b69ce8fdb31c3b9b0a67bd8049ad8c1a69ea417b69b12174068abd9cbd64826020015160405161192191815260200190565b60405180910390a250565b6000806000611939610d86565b73ffffffffffffffffffffffffffffffffffffffff1663ccf8f9696040518163ffffffff1660e01b815260040160206040518083038186803b15801561197e57600080fd5b505afa158015611992573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119b69190612a40565b64ffffffffff602882901c169460509190911c9350915050565b6000808211611a475760405162461bcd60e51b815260206004820152603760248201527f4c69625f4d65726b6c65547265653a20546f74616c206c6561766573206d757360448201527f742062652067726561746572207468616e207a65726f2e00000000000000000060648201526084016102b3565b818410611abb5760405162461bcd60e51b8152602060048201526024808201527f4c69625f4d65726b6c65547265653a20496e646578206f7574206f6620626f7560448201527f6e64732e0000000000000000000000000000000000000000000000000000000060648201526084016102b3565b611ac4826121fc565b835114611b5f5760405162461bcd60e51b815260206004820152604d60248201527f4c69625f4d65726b6c65547265653a20546f74616c207369626c696e6773206460448201527f6f6573206e6f7420636f72726563746c7920636f72726573706f6e6420746f2060648201527f746f74616c206c65617665732e00000000000000000000000000000000000000608482015260a4016102b3565b8460005b8451811015611c31578560011660011415611bca57848181518110611b8a57611b8a612a82565b602002602001015182604051602001611bad929190918252602082015260400190565b604051602081830303815290604052805190602001209150611c18565b81858281518110611bdd57611bdd612a82565b6020026020010151604051602001611bff929190918252602082015260400190565b6040516020818303038152906040528051906020012091505b60019590951c9480611c2981612ab1565b915050611b63565b5090951495945050505050565b6001546040517f3dbb202b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690633dbb202b90611c9890869085908790600401612aea565b600060405180830381600087803b158015611cb257600080fd5b505af1158015611cc6573d6000803e3d6000fd5b50505050505050565b600080825111611d475760405162461bcd60e51b815260206004820152603460248201527f4c69625f4d65726b6c65547265653a204d7573742070726f766964652061742060448201527f6c65617374206f6e65206c65616620686173682e00000000000000000000000060648201526084016102b3565b815160011415611d735781600081518110611d6457611d64612a82565b60200260200101519050919050565b60408051610200810182527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56381527f633dc4d7da7256660a892f8f1604a44b5432649cc8ec5cb3ced4c4e6ac94dd1d60208201527f890740a8eb06ce9be422cb8da5cdafc2b58c0a5e24036c578de2a433c828ff7d818301527f3b8ec09e026fdc305365dfc94e189a81b38c7597b3d941c279f042e8206e0bd86060808301919091527fecd50eee38e386bd62be9bedb990706951b65fe053bd9d8a521af753d139e2da60808301527fdefff6d330bb5403f63b14f33b578274160de3a50df4efecf0e0db73bcdd3da560a08301527f617bdd11f7c0a11f49db22f629387a12da7596f9d1704d7465177c63d88ec7d760c08301527f292c23a9aa1d8bea7e2435e555a4a60e379a5a35f3f452bae60121073fb6eead60e08301527fe1cea92ed99acdcb045a6726b2f87107e8a61620a232cf4d7d5b5766b3952e106101008301527f7ad66c0a68c72cb89e4fb4303841966e4062a76ab97451e3b9fb526a5ceb7f826101208301527fe026cc5a4aed3c22a58cbd3d2ac754c9352c5436f638042dca99034e836365166101408301527f3d04cffd8b46a874edf5cfae63077de85f849a660426697b06a829c70dd1409c6101608301527fad676aa337a485e4728a0b240d92b3ef7b3c372d06d189322bfd5f61f1e7203e6101808301527fa2fca4a49658f9fab7aa63289c91b7c7b6c832a6d0e69334ff5b0a3483d09dab6101a08301527f4ebfd9cd7bca2505f7bef59cc1c12ecc708fff26ae4af19abe852afe9e20c8626101c08301527f2def10d13dd169f550f578bda343d9717a138562e0093b380a1120789d53cf106101e083015282518381529081018352909160009190602082018180368337505085519192506000918291508180805b600184111561218957612024600285612b5e565b9150612031600285612b72565b600114905060005b828110156120dd578a61204d826002612b86565b8151811061205d5761205d612a82565b602002602001015196508a8160026120759190612b86565b612080906001612782565b8151811061209057612090612a82565b6020026020010151955086602089015285604089015287805190602001208b82815181106120c0576120c0612a82565b6020908102919091010152806120d581612ab1565b915050612039565b50801561215957896120f0600186612bc3565b8151811061210057612100612a82565b6020026020010151955087836010811061211c5761211c612a82565b602002015160001b945085602088015284604088015286805190602001208a838151811061214c5761214c612a82565b6020026020010181815250505b80612165576000612168565b60015b6121759060ff1683612782565b93508261218181612ab1565b935050612010565b8960008151811061219c5761219c612a82565b602002602001015198505050505050505050919050565b6020808201516040808401516060850151608086015160a087015193516000966121df969591016128ca565b604051602081830303815290604052805190602001209050919050565b60008082116122735760405162461bcd60e51b815260206004820152603060248201527f4c69625f4d65726b6c65547265653a2043616e6e6f7420636f6d70757465206360448201527f65696c286c6f675f3229206f6620302e0000000000000000000000000000000060648201526084016102b3565b816001141561228457506000919050565b81600060805b600181106122c257806122a0600180831b612bc3565b901b8316156122ba576122b38183612782565b92811c9291505b60011c61228a565b506001811b84146122db576122d8600182612782565b90505b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405160c0810167ffffffffffffffff81118282101715612334576123346122e2565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715612363576123636122e2565b604052919050565b600067ffffffffffffffff831115612385576123856122e2565b6123986020601f19601f8601160161233a565b90508281528383830111156123ac57600080fd5b828260208301376000602084830101529392505050565b600082601f8301126123d457600080fd5b6122db8383356020850161236b565b6000806000606084860312156123f857600080fd5b8335925060208401359150604084013567ffffffffffffffff81111561241d57600080fd5b612429868287016123c3565b9150509250925092565b600067ffffffffffffffff82111561244d5761244d6122e2565b5060051b60200190565b600082601f83011261246857600080fd5b8135602061247d61247883612433565b61233a565b82815260059290921b8401810191818101908684111561249c57600080fd5b8286015b848110156124b757803583529183019183016124a0565b509695505050505050565b6000806000606084860312156124d757600080fd5b833567ffffffffffffffff808211156124ef57600080fd5b6124fb87838801612457565b945060208601359350604086013591508082111561251857600080fd5b50612429868287016123c3565b60006020828403121561253757600080fd5b813567ffffffffffffffff81111561254e57600080fd5b8201601f8101841361255f57600080fd5b61256e8482356020840161236b565b949350505050565b600060c0828403121561258857600080fd5b612590612311565b905081358152602082013560208201526040820135604082015260608201356060820152608082013567ffffffffffffffff808211156125cf57600080fd5b6125db858386016123c3565b608084015260a08401359150808211156125f457600080fd5b50612601848285016123c3565b60a08301525092915050565b60006020828403121561261f57600080fd5b813567ffffffffffffffff81111561263657600080fd5b61256e84828501612576565b60006020828403121561265457600080fd5b5035919050565b60008060006060848603121561267057600080fd5b83359250602084013567ffffffffffffffff8082111561268f57600080fd5b61269b87838801612576565b935060408601359150808211156126b157600080fd5b90850190604082880312156126c557600080fd5b6040516040810181811083821117156126e0576126e06122e2565b604052823581526020830135828111156126f957600080fd5b61270589828601612457565b6020830152508093505050509250925092565b60006020828403121561272a57600080fd5b815180151581146122db57600080fd5b60006020828403121561274c57600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561279557612795612753565b500190565b6000815180845260005b818110156127c0576020818501810151868301820152016127a4565b818111156127d2576000602083870101525b50601f01601f19169290920160200192915050565b6020815260006122db602083018461279a565b73ffffffffffffffffffffffffffffffffffffffff81168114610a8b57600080fd5b60006020828403121561282e57600080fd5b81516122db816127fa565b6000806040838503121561284c57600080fd5b82519150602083015161285e816127fa565b809150509250929050565b82815260406020820152600061256e604083018461279a565b604080825283519082018190526000906020906060840190828701845b828110156128bb5781518452928401929084019060010161289f565b50505092019290925292915050565b85815284602082015283604082015260a0606082015260006128ef60a083018561279a565b8281036080840152612901818561279a565b98975050505050505050565b6000602080838503121561292057600080fd5b825167ffffffffffffffff81111561293757600080fd5b8301601f8101851361294857600080fd5b805161295661247882612433565b81815260059190911b8201830190838101908783111561297557600080fd5b928401925b8284101561299c57835161298d816127fa565b8252928401929084019061297a565b979650505050505050565b600081518084526020808501945080840160005b838110156129ed57815173ffffffffffffffffffffffffffffffffffffffff16875295820195908201906001016129bb565b509495945050505050565b848152836020820152826040820152608060608201526000612a1d60808301846129a7565b9695505050505050565b82815260406020820152600061256e60408301846129a7565b600060208284031215612a5257600080fd5b81517fffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000811681146122db57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612ae357612ae3612753565b5060010190565b73ffffffffffffffffffffffffffffffffffffffff84168152606060208201526000612b19606083018561279a565b905063ffffffff83166040830152949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600082612b6d57612b6d612b2f565b500490565b600082612b8157612b81612b2f565b500690565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612bbe57612bbe612753565b500290565b600082821015612bd557612bd5612753565b50039056fe436861696e53746f72616765436f6e7461696e65722d5343432d62617463686573a2646970667358221220ca5b74ebfe0b6f4fdac26d9786ce0cc29a18b2788a9e756d247d644ac6a060f364736f6c63430008090033";

type StateCommitmentChainConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StateCommitmentChainConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StateCommitmentChain__factory extends ContractFactory {
  constructor(...args: StateCommitmentChainConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _libAddressManager: PromiseOrValue<string>,
    _l1messenger: PromiseOrValue<string>,
    _fraudProofWindow: PromiseOrValue<BigNumberish>,
    _sequencerPublishWindow: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StateCommitmentChain> {
    return super.deploy(
      _libAddressManager,
      _l1messenger,
      _fraudProofWindow,
      _sequencerPublishWindow,
      overrides || {}
    ) as Promise<StateCommitmentChain>;
  }
  override getDeployTransaction(
    _libAddressManager: PromiseOrValue<string>,
    _l1messenger: PromiseOrValue<string>,
    _fraudProofWindow: PromiseOrValue<BigNumberish>,
    _sequencerPublishWindow: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _libAddressManager,
      _l1messenger,
      _fraudProofWindow,
      _sequencerPublishWindow,
      overrides || {}
    );
  }
  override attach(address: string): StateCommitmentChain {
    return super.attach(address) as StateCommitmentChain;
  }
  override connect(signer: Signer): StateCommitmentChain__factory {
    return super.connect(signer) as StateCommitmentChain__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StateCommitmentChainInterface {
    return new utils.Interface(_abi) as StateCommitmentChainInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StateCommitmentChain {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as StateCommitmentChain;
  }
}