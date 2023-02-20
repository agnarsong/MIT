/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IL1ChugSplashDeployer,
  IL1ChugSplashDeployerInterface,
} from "../../../../contracts/chugsplash/interfaces/IL1ChugSplashDeployer";

const _abi = [
  {
    inputs: [],
    name: "isUpgrading",
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
] as const;

export class IL1ChugSplashDeployer__factory {
  static readonly abi = _abi;
  static createInterface(): IL1ChugSplashDeployerInterface {
    return new utils.Interface(_abi) as IL1ChugSplashDeployerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IL1ChugSplashDeployer {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IL1ChugSplashDeployer;
  }
}
