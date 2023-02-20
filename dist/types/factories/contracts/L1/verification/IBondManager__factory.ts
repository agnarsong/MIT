/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IBondManager,
  IBondManagerInterface,
} from "../../../../contracts/L1/verification/IBondManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_who",
        type: "address",
      },
    ],
    name: "isCollateralized",
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

export class IBondManager__factory {
  static readonly abi = _abi;
  static createInterface(): IBondManagerInterface {
    return new utils.Interface(_abi) as IBondManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBondManager {
    return new Contract(address, _abi, signerOrProvider) as IBondManager;
  }
}
