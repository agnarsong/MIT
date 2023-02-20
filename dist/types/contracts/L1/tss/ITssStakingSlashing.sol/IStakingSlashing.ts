/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export declare namespace IStakingSlashing {
  export type DepositInfoStruct = {
    pledgor: PromiseOrValue<string>;
    pubKey: PromiseOrValue<BytesLike>;
    amount: PromiseOrValue<BigNumberish>;
  };

  export type DepositInfoStructOutput = [string, string, BigNumber] & {
    pledgor: string;
    pubKey: string;
    amount: BigNumber;
  };
}

export interface IStakingSlashingInterface extends utils.Interface {
  functions: {
    "batchGetDeposits(address[])": FunctionFragment;
    "clearQuitRequestList()": FunctionFragment;
    "getDeposits(address)": FunctionFragment;
    "getQuitRequestList()": FunctionFragment;
    "getSlashRecord(uint256,address)": FunctionFragment;
    "getSlashingParams()": FunctionFragment;
    "isJailed(address)": FunctionFragment;
    "quitRequest()": FunctionFragment;
    "setAddress(address,address)": FunctionFragment;
    "setSlashingParams(uint256[2],uint256[2])": FunctionFragment;
    "slashing(bytes,bytes)": FunctionFragment;
    "staking(uint256,bytes)": FunctionFragment;
    "unJail()": FunctionFragment;
    "withdrawToken()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "batchGetDeposits"
      | "clearQuitRequestList"
      | "getDeposits"
      | "getQuitRequestList"
      | "getSlashRecord"
      | "getSlashingParams"
      | "isJailed"
      | "quitRequest"
      | "setAddress"
      | "setSlashingParams"
      | "slashing"
      | "staking"
      | "unJail"
      | "withdrawToken"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "batchGetDeposits",
    values: [PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "clearQuitRequestList",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDeposits",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getQuitRequestList",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSlashRecord",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSlashingParams",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isJailed",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "quitRequest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAddress",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setSlashingParams",
    values: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "slashing",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "staking",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "unJail", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "batchGetDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "clearQuitRequestList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getQuitRequestList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSlashRecord",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSlashingParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isJailed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "quitRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAddress", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setSlashingParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "slashing", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "staking", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unJail", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IStakingSlashing extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IStakingSlashingInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    batchGetDeposits(
      arg0: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<[IStakingSlashing.DepositInfoStructOutput[]]>;

    clearQuitRequestList(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getDeposits(
      arg0: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getQuitRequestList(overrides?: CallOverrides): Promise<[string[]]>;

    getSlashRecord(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getSlashingParams(
      overrides?: CallOverrides
    ): Promise<[[BigNumber, BigNumber], [BigNumber, BigNumber]]>;

    isJailed(
      arg0: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    quitRequest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAddress(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSlashingParams(
      arg0: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      arg1: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    slashing(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    staking(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unJail(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawToken(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  batchGetDeposits(
    arg0: PromiseOrValue<string>[],
    overrides?: CallOverrides
  ): Promise<IStakingSlashing.DepositInfoStructOutput[]>;

  clearQuitRequestList(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getDeposits(
    arg0: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getQuitRequestList(overrides?: CallOverrides): Promise<string[]>;

  getSlashRecord(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getSlashingParams(
    overrides?: CallOverrides
  ): Promise<[[BigNumber, BigNumber], [BigNumber, BigNumber]]>;

  isJailed(
    arg0: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  quitRequest(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAddress(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSlashingParams(
    arg0: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    arg1: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  slashing(
    arg0: PromiseOrValue<BytesLike>,
    arg1: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  staking(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unJail(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawToken(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    batchGetDeposits(
      arg0: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<IStakingSlashing.DepositInfoStructOutput[]>;

    clearQuitRequestList(overrides?: CallOverrides): Promise<void>;

    getDeposits(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<IStakingSlashing.DepositInfoStructOutput>;

    getQuitRequestList(overrides?: CallOverrides): Promise<string[]>;

    getSlashRecord(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getSlashingParams(
      overrides?: CallOverrides
    ): Promise<[[BigNumber, BigNumber], [BigNumber, BigNumber]]>;

    isJailed(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    quitRequest(overrides?: CallOverrides): Promise<void>;

    setAddress(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setSlashingParams(
      arg0: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      arg1: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: CallOverrides
    ): Promise<void>;

    slashing(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    staking(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    unJail(overrides?: CallOverrides): Promise<void>;

    withdrawToken(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    batchGetDeposits(
      arg0: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    clearQuitRequestList(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getDeposits(
      arg0: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getQuitRequestList(overrides?: CallOverrides): Promise<BigNumber>;

    getSlashRecord(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSlashingParams(overrides?: CallOverrides): Promise<BigNumber>;

    isJailed(
      arg0: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    quitRequest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAddress(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSlashingParams(
      arg0: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      arg1: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    slashing(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    staking(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unJail(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawToken(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    batchGetDeposits(
      arg0: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    clearQuitRequestList(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getDeposits(
      arg0: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getQuitRequestList(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSlashRecord(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSlashingParams(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isJailed(
      arg0: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    quitRequest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAddress(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSlashingParams(
      arg0: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      arg1: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    slashing(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    staking(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unJail(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawToken(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}