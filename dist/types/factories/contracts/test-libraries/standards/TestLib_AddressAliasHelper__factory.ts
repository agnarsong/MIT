/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  TestLib_AddressAliasHelper,
  TestLib_AddressAliasHelperInterface,
} from "../../../../contracts/test-libraries/standards/TestLib_AddressAliasHelper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "applyL1ToL2Alias",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "undoL1ToL2Alias",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610147806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063689992b31461003b5780637528c2c614610077575b600080fd5b61004e6100493660046100d4565b61008a565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b61004e6100853660046100d4565b6100b6565b60007fffffffffffffffffffffffffeeeeffffffffffffffffffffffffffffffffeeef82015b92915050565b600073111100000000000000000000000000000000111182016100b0565b6000602082840312156100e657600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461010a57600080fd5b939250505056fea26469706673582212201457f8e5542f32e181572128a997cc6ed282c1dc72f41d4fd52b102e52787f8e64736f6c63430008090033";

type TestLib_AddressAliasHelperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestLib_AddressAliasHelperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestLib_AddressAliasHelper__factory extends ContractFactory {
  constructor(...args: TestLib_AddressAliasHelperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestLib_AddressAliasHelper> {
    return super.deploy(overrides || {}) as Promise<TestLib_AddressAliasHelper>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestLib_AddressAliasHelper {
    return super.attach(address) as TestLib_AddressAliasHelper;
  }
  override connect(signer: Signer): TestLib_AddressAliasHelper__factory {
    return super.connect(signer) as TestLib_AddressAliasHelper__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestLib_AddressAliasHelperInterface {
    return new utils.Interface(_abi) as TestLib_AddressAliasHelperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestLib_AddressAliasHelper {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestLib_AddressAliasHelper;
  }
}
