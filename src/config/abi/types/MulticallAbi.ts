/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type MultiCallStruct = { target: string; data: BytesLike };

export type MultiCallStructOutput = [string, string] & {
  target: string;
  data: string;
};

export interface MulticallAbiInterface extends utils.Interface {
  functions: {
    "multicall((address,bytes)[])": FunctionFragment;
    "getEthBalance(address)": FunctionFragment;
    "getCurrentTimestamp()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "multicall",
    values: [MultiCallStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getEthBalance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentTimestamp",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getEthBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentTimestamp",
    data: BytesLike
  ): Result;

  events: {};
}

export interface MulticallAbi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MulticallAbiInterface;

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
    multicall(
      calls: MultiCallStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getEthBalance(
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getCurrentTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  multicall(
    calls: MultiCallStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getEthBalance(user: string, overrides?: CallOverrides): Promise<BigNumber>;

  getCurrentTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    multicall(
      calls: MultiCallStruct[],
      overrides?: CallOverrides
    ): Promise<string[]>;

    getEthBalance(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    multicall(
      calls: MultiCallStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getEthBalance(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    multicall(
      calls: MultiCallStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getEthBalance(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCurrentTimestamp(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}