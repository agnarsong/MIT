/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IBVM_L1BlockNumber,
  IBVM_L1BlockNumberInterface,
} from "../../../../contracts/L2/predeploys/IBVM_L1BlockNumber";

const _abi = [
  {
    inputs: [],
    name: "getL1BlockNumber",
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
];

export class IBVM_L1BlockNumber__factory {
  static readonly abi = _abi;
  static createInterface(): IBVM_L1BlockNumberInterface {
    return new utils.Interface(_abi) as IBVM_L1BlockNumberInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBVM_L1BlockNumber {
    return new Contract(address, _abi, signerOrProvider) as IBVM_L1BlockNumber;
  }
}