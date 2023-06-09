/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  VaultsFactoryAbi,
  VaultsFactoryAbiInterface,
} from "../VaultsFactoryAbi";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "profileId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "vaultAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "deployer",
        type: "address",
      },
    ],
    name: "AddVault",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "profiles",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "quoteTokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniFactory",
    outputs: [
      {
        internalType: "contract IPancakeFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_baseToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_quoteToken",
        type: "address",
      },
    ],
    name: "getPairAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]",
      },
    ],
    name: "getBnbBalances",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_profileId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_baseToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_quoteTokenId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_sellers",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_buyers",
        type: "address[]",
      },
    ],
    name: "addVault",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class VaultsFactoryAbi__factory {
  static readonly abi = _abi;
  static createInterface(): VaultsFactoryAbiInterface {
    return new utils.Interface(_abi) as VaultsFactoryAbiInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VaultsFactoryAbi {
    return new Contract(address, _abi, signerOrProvider) as VaultsFactoryAbi;
  }
}
