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
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

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

export interface TssStakingSlashingInterface extends utils.Interface {
  functions: {
    "BitToken()": FunctionFragment;
    "batchGetDeposits(address[])": FunctionFragment;
    "clearQuitRequestList()": FunctionFragment;
    "deposits(address)": FunctionFragment;
    "exIncome(uint256)": FunctionFragment;
    "getDeposits(address)": FunctionFragment;
    "getQuitRequestList()": FunctionFragment;
    "getSlashRecord(uint256,address)": FunctionFragment;
    "getSlashingParams()": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "isEqual(bytes,bytes)": FunctionFragment;
    "isJailed(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "quitRequest()": FunctionFragment;
    "quitRequestList(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAddress(address,address)": FunctionFragment;
    "setSlashingParams(uint256[2],uint256[2])": FunctionFragment;
    "slashAmount(uint256)": FunctionFragment;
    "slashing(bytes,bytes)": FunctionFragment;
    "staking(uint256,bytes)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "tssGroupContract()": FunctionFragment;
    "unJail()": FunctionFragment;
    "withdrawToken()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "BitToken"
      | "batchGetDeposits"
      | "clearQuitRequestList"
      | "deposits"
      | "exIncome"
      | "getDeposits"
      | "getQuitRequestList"
      | "getSlashRecord"
      | "getSlashingParams"
      | "initialize"
      | "isEqual"
      | "isJailed"
      | "owner"
      | "quitRequest"
      | "quitRequestList"
      | "renounceOwnership"
      | "setAddress"
      | "setSlashingParams"
      | "slashAmount"
      | "slashing"
      | "staking"
      | "transferOwnership"
      | "tssGroupContract"
      | "unJail"
      | "withdrawToken"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "BitToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "batchGetDeposits",
    values: [PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "clearQuitRequestList",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deposits",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "exIncome",
    values: [PromiseOrValue<BigNumberish>]
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
    functionFragment: "initialize",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isEqual",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "isJailed",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "quitRequest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "quitRequestList",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
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
    functionFragment: "slashAmount",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "slashing",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "staking",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "tssGroupContract",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "unJail", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "BitToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "batchGetDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "clearQuitRequestList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposits", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "exIncome", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isEqual", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isJailed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "quitRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quitRequestList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAddress", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setSlashingParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "slashAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "slashing", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "staking", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tssGroupContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unJail", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;

  events: {
    "AddDeposit(address,tuple)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Slashing(address,uint8)": EventFragment;
    "Withdraw(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddDeposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Slashing"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface AddDepositEventObject {
  arg0: string;
  arg1: IStakingSlashing.DepositInfoStructOutput;
}
export type AddDepositEvent = TypedEvent<
  [string, IStakingSlashing.DepositInfoStructOutput],
  AddDepositEventObject
>;

export type AddDepositEventFilter = TypedEventFilter<AddDepositEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface SlashingEventObject {
  arg0: string;
  arg1: number;
}
export type SlashingEvent = TypedEvent<[string, number], SlashingEventObject>;

export type SlashingEventFilter = TypedEventFilter<SlashingEvent>;

export interface WithdrawEventObject {
  arg0: string;
  arg1: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface TssStakingSlashing extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TssStakingSlashingInterface;

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
    BitToken(overrides?: CallOverrides): Promise<[string]>;

    batchGetDeposits(
      users: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<[IStakingSlashing.DepositInfoStructOutput[]]>;

    clearQuitRequestList(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deposits(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber] & {
        pledgor: string;
        pubKey: string;
        amount: BigNumber;
      }
    >;

    exIncome(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getDeposits(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[IStakingSlashing.DepositInfoStructOutput]>;

    getQuitRequestList(overrides?: CallOverrides): Promise<[string[]]>;

    getSlashRecord(
      batchIndex: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getSlashingParams(
      overrides?: CallOverrides
    ): Promise<[[BigNumber, BigNumber], [BigNumber, BigNumber]]>;

    initialize(
      _bitToken: PromiseOrValue<string>,
      _tssGroupContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isEqual(
      byteListA: PromiseOrValue<BytesLike>,
      byteListB: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isJailed(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    quitRequest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    quitRequestList(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAddress(
      _token: PromiseOrValue<string>,
      _tssGroup: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSlashingParams(
      _slashAmount: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      _exIncome: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    slashAmount(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    slashing(
      _messageBytes: PromiseOrValue<BytesLike>,
      _sig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    staking(
      _amount: PromiseOrValue<BigNumberish>,
      _pubKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tssGroupContract(overrides?: CallOverrides): Promise<[string]>;

    unJail(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawToken(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  BitToken(overrides?: CallOverrides): Promise<string>;

  batchGetDeposits(
    users: PromiseOrValue<string>[],
    overrides?: CallOverrides
  ): Promise<IStakingSlashing.DepositInfoStructOutput[]>;

  clearQuitRequestList(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deposits(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber] & {
      pledgor: string;
      pubKey: string;
      amount: BigNumber;
    }
  >;

  exIncome(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getDeposits(
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<IStakingSlashing.DepositInfoStructOutput>;

  getQuitRequestList(overrides?: CallOverrides): Promise<string[]>;

  getSlashRecord(
    batchIndex: PromiseOrValue<BigNumberish>,
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getSlashingParams(
    overrides?: CallOverrides
  ): Promise<[[BigNumber, BigNumber], [BigNumber, BigNumber]]>;

  initialize(
    _bitToken: PromiseOrValue<string>,
    _tssGroupContract: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isEqual(
    byteListA: PromiseOrValue<BytesLike>,
    byteListB: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isJailed(
    user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  quitRequest(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  quitRequestList(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAddress(
    _token: PromiseOrValue<string>,
    _tssGroup: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSlashingParams(
    _slashAmount: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    _exIncome: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  slashAmount(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  slashing(
    _messageBytes: PromiseOrValue<BytesLike>,
    _sig: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  staking(
    _amount: PromiseOrValue<BigNumberish>,
    _pubKey: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tssGroupContract(overrides?: CallOverrides): Promise<string>;

  unJail(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawToken(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    BitToken(overrides?: CallOverrides): Promise<string>;

    batchGetDeposits(
      users: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<IStakingSlashing.DepositInfoStructOutput[]>;

    clearQuitRequestList(overrides?: CallOverrides): Promise<void>;

    deposits(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber] & {
        pledgor: string;
        pubKey: string;
        amount: BigNumber;
      }
    >;

    exIncome(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDeposits(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<IStakingSlashing.DepositInfoStructOutput>;

    getQuitRequestList(overrides?: CallOverrides): Promise<string[]>;

    getSlashRecord(
      batchIndex: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getSlashingParams(
      overrides?: CallOverrides
    ): Promise<[[BigNumber, BigNumber], [BigNumber, BigNumber]]>;

    initialize(
      _bitToken: PromiseOrValue<string>,
      _tssGroupContract: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    isEqual(
      byteListA: PromiseOrValue<BytesLike>,
      byteListB: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isJailed(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    quitRequest(overrides?: CallOverrides): Promise<void>;

    quitRequestList(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setAddress(
      _token: PromiseOrValue<string>,
      _tssGroup: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setSlashingParams(
      _slashAmount: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      _exIncome: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: CallOverrides
    ): Promise<void>;

    slashAmount(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    slashing(
      _messageBytes: PromiseOrValue<BytesLike>,
      _sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    staking(
      _amount: PromiseOrValue<BigNumberish>,
      _pubKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    tssGroupContract(overrides?: CallOverrides): Promise<string>;

    unJail(overrides?: CallOverrides): Promise<void>;

    withdrawToken(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "AddDeposit(address,tuple)"(
      arg0?: null,
      arg1?: null
    ): AddDepositEventFilter;
    AddDeposit(arg0?: null, arg1?: null): AddDepositEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Slashing(address,uint8)"(arg0?: null, arg1?: null): SlashingEventFilter;
    Slashing(arg0?: null, arg1?: null): SlashingEventFilter;

    "Withdraw(address,uint256)"(arg0?: null, arg1?: null): WithdrawEventFilter;
    Withdraw(arg0?: null, arg1?: null): WithdrawEventFilter;
  };

  estimateGas: {
    BitToken(overrides?: CallOverrides): Promise<BigNumber>;

    batchGetDeposits(
      users: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    clearQuitRequestList(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deposits(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exIncome(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDeposits(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getQuitRequestList(overrides?: CallOverrides): Promise<BigNumber>;

    getSlashRecord(
      batchIndex: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSlashingParams(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _bitToken: PromiseOrValue<string>,
      _tssGroupContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isEqual(
      byteListA: PromiseOrValue<BytesLike>,
      byteListB: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isJailed(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    quitRequest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    quitRequestList(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAddress(
      _token: PromiseOrValue<string>,
      _tssGroup: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSlashingParams(
      _slashAmount: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      _exIncome: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    slashAmount(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    slashing(
      _messageBytes: PromiseOrValue<BytesLike>,
      _sig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    staking(
      _amount: PromiseOrValue<BigNumberish>,
      _pubKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tssGroupContract(overrides?: CallOverrides): Promise<BigNumber>;

    unJail(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawToken(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    BitToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    batchGetDeposits(
      users: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    clearQuitRequestList(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deposits(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    exIncome(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDeposits(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getQuitRequestList(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSlashRecord(
      batchIndex: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSlashingParams(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _bitToken: PromiseOrValue<string>,
      _tssGroupContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isEqual(
      byteListA: PromiseOrValue<BytesLike>,
      byteListB: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isJailed(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    quitRequest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    quitRequestList(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAddress(
      _token: PromiseOrValue<string>,
      _tssGroup: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSlashingParams(
      _slashAmount: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      _exIncome: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    slashAmount(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    slashing(
      _messageBytes: PromiseOrValue<BytesLike>,
      _sig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    staking(
      _amount: PromiseOrValue<BigNumberish>,
      _pubKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tssGroupContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    unJail(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawToken(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
