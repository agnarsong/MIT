/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  L2StandardTokenFactory,
  L2StandardTokenFactoryInterface,
} from "../../../../contracts/L2/messaging/L2StandardTokenFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "decimal",
        type: "uint8",
      },
    ],
    name: "StandardL2TokenCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_decimal",
        type: "uint8",
      },
    ],
    name: "createStandardL2Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611873806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80630769a96914610030575b600080fd5b61004361003e36600461025c565b610045565b005b73ffffffffffffffffffffffffffffffffffffffff84166100c6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f4d7573742070726f76696465204c3120746f6b656e2061646472657373000000604482015260640160405180910390fd5b6000734200000000000000000000000000000000000010858585856040516100ed90610175565b6100fb95949392919061036f565b604051809103906000f080158015610117573d6000803e3d6000fd5b5060405160ff8416815290915073ffffffffffffffffffffffffffffffffffffffff80831691908716907f41e27481c6f764357db26ae29b68b9f3aafc40b87444459cbf50d338c75317329060200160405180910390a35050505050565b61146d806103d183390190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f8301126101c257600080fd5b813567ffffffffffffffff808211156101dd576101dd610182565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190828211818310171561022357610223610182565b8160405283815286602085880101111561023c57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000806080858703121561027257600080fd5b843573ffffffffffffffffffffffffffffffffffffffff8116811461029657600080fd5b9350602085013567ffffffffffffffff808211156102b357600080fd5b6102bf888389016101b1565b945060408701359150808211156102d557600080fd5b506102e2878288016101b1565b925050606085013560ff811681146102f957600080fd5b939692955090935050565b6000815180845260005b8181101561032a5760208185018101518683018201520161030e565b8181111561033c576000602083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b600073ffffffffffffffffffffffffffffffffffffffff808816835280871660208401525060a060408301526103a860a0830186610304565b82810360608401526103ba8186610304565b91505060ff83166080830152969550505050505056fe60806040523480156200001157600080fd5b506040516200146d3803806200146d833981016040819052620000349162000247565b8251839083906200004d906003906020850190620000b7565b50805162000063906004906020840190620000b7565b5050600580546001600160a01b039687166001600160a01b0319909116179055506006805460ff909216600160a01b026001600160a81b031990921695909416949094179390931790915550620003309050565b828054620000c590620002f3565b90600052602060002090601f016020900481019282620000e9576000855562000134565b82601f106200010457805160ff191683800117855562000134565b8280016001018555821562000134579182015b828111156200013457825182559160200191906001019062000117565b506200014292915062000146565b5090565b5b8082111562000142576000815560010162000147565b80516001600160a01b03811681146200017557600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001a257600080fd5b81516001600160401b0380821115620001bf57620001bf6200017a565b604051601f8301601f19908116603f01168101908282118183101715620001ea57620001ea6200017a565b816040528381526020925086838588010111156200020757600080fd5b600091505b838210156200022b57858201830151818301840152908201906200020c565b838211156200023d5760008385830101525b9695505050505050565b600080600080600060a086880312156200026057600080fd5b6200026b866200015d565b94506200027b602087016200015d565b60408701519094506001600160401b03808211156200029957600080fd5b620002a789838a0162000190565b94506060880151915080821115620002be57600080fd5b50620002cd8882890162000190565b925050608086015160ff81168114620002e557600080fd5b809150509295509295909350565b600181811c908216806200030857607f821691505b602082108114156200032a57634e487b7160e01b600052602260045260246000fd5b50919050565b61112d80620003406000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806370a08231116100b2578063a457c2d711610081578063ae1f6aaf11610066578063ae1f6aaf1461028a578063c01e1bd6146102cf578063dd62ed3e146102ef57600080fd5b8063a457c2d714610264578063a9059cbb1461027757600080fd5b806370a08231146101ee57806376809ce31461022457806395d89b41146102495780639dc29fac1461025157600080fd5b806323b872dd116100ee57806323b872dd14610182578063313ce5671461019557806339509351146101c657806340c10f19146101d957600080fd5b806301ffc9a71461012057806306fdde0314610148578063095ea7b31461015d57806318160ddd14610170575b600080fd5b61013361012e366004610eac565b610335565b60405190151581526020015b60405180910390f35b6101506103f5565b60405161013f9190610ef5565b61013361016b366004610f91565b610487565b6002545b60405190815260200161013f565b610133610190366004610fbb565b61049d565b60065474010000000000000000000000000000000000000000900460ff165b60405160ff909116815260200161013f565b6101336101d4366004610f91565b61056e565b6101ec6101e7366004610f91565b6105b7565b005b6101746101fc366004610ff7565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6006546101b49074010000000000000000000000000000000000000000900460ff1681565b61015061067c565b6101ec61025f366004610f91565b61068b565b610133610272366004610f91565b610744565b610133610285366004610f91565b610802565b6006546102aa9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161013f565b6005546102aa9073ffffffffffffffffffffffffffffffffffffffff1681565b6101746102fd366004611012565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b60007f01ffc9a7a5cef8baa21ed3c5c0d7e23accb804b619e9333b597f47a0d84076e27f1d1d8b63000000000000000000000000000000000000000000000000000000007fffffffff0000000000000000000000000000000000000000000000000000000084167f01ffc9a70000000000000000000000000000000000000000000000000000000014806103ed57507fffffffff00000000000000000000000000000000000000000000000000000000848116908216145b949350505050565b60606003805461040490611045565b80601f016020809104026020016040519081016040528092919081815260200182805461043090611045565b801561047d5780601f106104525761010080835404028352916020019161047d565b820191906000526020600020905b81548152906001019060200180831161046057829003601f168201915b5050505050905090565b600061049433848461080f565b50600192915050565b60006104aa84848461098f565b73ffffffffffffffffffffffffffffffffffffffff84166000908152600160209081526040808320338452909152902054828110156105565760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b610563853385840361080f565b506001949350505050565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490916104949185906105b29086906110c8565b61080f565b60065473ffffffffffffffffffffffffffffffffffffffff16331461061e5760405162461bcd60e51b815260206004820181905260248201527f4f6e6c79204c32204272696467652063616e206d696e7420616e64206275726e604482015260640161054d565b6106288282610bf5565b8173ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d41213968858260405161067091815260200190565b60405180910390a25050565b60606004805461040490611045565b60065473ffffffffffffffffffffffffffffffffffffffff1633146106f25760405162461bcd60e51b815260206004820181905260248201527f4f6e6c79204c32204272696467652063616e206d696e7420616e64206275726e604482015260640161054d565b6106fc8282610cfb565b8173ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca58260405161067091815260200190565b33600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff86168452909152812054828110156107eb5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f000000000000000000000000000000000000000000000000000000606482015260840161054d565b6107f8338585840361080f565b5060019392505050565b600061049433848461098f565b73ffffffffffffffffffffffffffffffffffffffff83166108975760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161054d565b73ffffffffffffffffffffffffffffffffffffffff82166109205760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015260840161054d565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316610a185760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015260840161054d565b73ffffffffffffffffffffffffffffffffffffffff8216610aa15760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161054d565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205481811015610b3d5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161054d565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260208190526040808220858503905591851681529081208054849290610b819084906110c8565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610be791815260200190565b60405180910390a350505050565b73ffffffffffffffffffffffffffffffffffffffff8216610c585760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161054d565b8060026000828254610c6a91906110c8565b909155505073ffffffffffffffffffffffffffffffffffffffff821660009081526020819052604081208054839290610ca49084906110c8565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff8216610d845760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f7300000000000000000000000000000000000000000000000000000000000000606482015260840161054d565b73ffffffffffffffffffffffffffffffffffffffff821660009081526020819052604090205481811015610e205760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f6365000000000000000000000000000000000000000000000000000000000000606482015260840161054d565b73ffffffffffffffffffffffffffffffffffffffff83166000908152602081905260408120838303905560028054849290610e5c9084906110e0565b909155505060405182815260009073ffffffffffffffffffffffffffffffffffffffff8516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610982565b600060208284031215610ebe57600080fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114610eee57600080fd5b9392505050565b600060208083528351808285015260005b81811015610f2257858101830151858201604001528201610f06565b81811115610f34576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610f8c57600080fd5b919050565b60008060408385031215610fa457600080fd5b610fad83610f68565b946020939093013593505050565b600080600060608486031215610fd057600080fd5b610fd984610f68565b9250610fe760208501610f68565b9150604084013590509250925092565b60006020828403121561100957600080fd5b610eee82610f68565b6000806040838503121561102557600080fd5b61102e83610f68565b915061103c60208401610f68565b90509250929050565b600181811c9082168061105957607f821691505b60208210811415611093577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082198211156110db576110db611099565b500190565b6000828210156110f2576110f2611099565b50039056fea2646970667358221220ab7ddcc069894ab0c9603724acfbe497a2711b0082f18ecb2e7e55d7bdd7907864736f6c63430008090033a2646970667358221220a8284f3e8a840cded5a59b6bef46ebaa83af9494841c13131c3e2d32c9b5710064736f6c63430008090033";

type L2StandardTokenFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: L2StandardTokenFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class L2StandardTokenFactory__factory extends ContractFactory {
  constructor(...args: L2StandardTokenFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<L2StandardTokenFactory> {
    return super.deploy(overrides || {}) as Promise<L2StandardTokenFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): L2StandardTokenFactory {
    return super.attach(address) as L2StandardTokenFactory;
  }
  override connect(signer: Signer): L2StandardTokenFactory__factory {
    return super.connect(signer) as L2StandardTokenFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): L2StandardTokenFactoryInterface {
    return new utils.Interface(_abi) as L2StandardTokenFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): L2StandardTokenFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as L2StandardTokenFactory;
  }
}
