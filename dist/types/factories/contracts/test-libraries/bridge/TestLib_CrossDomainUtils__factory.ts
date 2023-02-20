/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  TestLib_CrossDomainUtils,
  TestLib_CrossDomainUtilsInterface,
} from "../../../../contracts/test-libraries/bridge/TestLib_CrossDomainUtils";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_messageNonce",
        type: "uint256",
      },
    ],
    name: "encodeXDomainCalldata",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x61036861003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100355760003560e01c8063053156471461003a575b600080fd5b61004d61004836600461016b565b610063565b60405161005a91906102ce565b60405180910390f35b60606100718585858561007a565b95945050505050565b60608484848460405160240161009394939291906102e8565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fcbd4ece9000000000000000000000000000000000000000000000000000000001790529050949350505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461013757600080fd5b919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000806080858703121561018157600080fd5b61018a85610113565b935061019860208601610113565b9250604085013567ffffffffffffffff808211156101b557600080fd5b818701915087601f8301126101c957600080fd5b8135818111156101db576101db61013c565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156102215761022161013c565b816040528281528a602084870101111561023a57600080fd5b826020860160208301376000928101602001929092525095989497509495606001359450505050565b6000815180845260005b818110156102895760208185018101518683018201520161026d565b8181111561029b576000602083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006102e16020830184610263565b9392505050565b600073ffffffffffffffffffffffffffffffffffffffff8087168352808616602084015250608060408301526103216080830185610263565b90508260608301529594505050505056fea2646970667358221220247aed227af37e0d8979d8447bf4634fc2b456ad46e0879d357aea2e58c03af864736f6c63430008090033";

type TestLib_CrossDomainUtilsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestLib_CrossDomainUtilsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestLib_CrossDomainUtils__factory extends ContractFactory {
  constructor(...args: TestLib_CrossDomainUtilsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestLib_CrossDomainUtils> {
    return super.deploy(overrides || {}) as Promise<TestLib_CrossDomainUtils>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestLib_CrossDomainUtils {
    return super.attach(address) as TestLib_CrossDomainUtils;
  }
  override connect(signer: Signer): TestLib_CrossDomainUtils__factory {
    return super.connect(signer) as TestLib_CrossDomainUtils__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestLib_CrossDomainUtilsInterface {
    return new utils.Interface(_abi) as TestLib_CrossDomainUtilsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestLib_CrossDomainUtils {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestLib_CrossDomainUtils;
  }
}
