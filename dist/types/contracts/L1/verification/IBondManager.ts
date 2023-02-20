/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
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
} from "../../../common";

export interface IBondManagerInterface extends utils.Interface {
  functions: {
    "isCollateralized(address)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "isCollateralized"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "isCollateralized",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "isCollateralized",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IBondManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IBondManagerInterface;

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
    isCollateralized(
      _who: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  isCollateralized(
    _who: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    isCollateralized(
      _who: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    isCollateralized(
      _who: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    isCollateralized(
      _who: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}