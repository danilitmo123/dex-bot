import { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { VaultAbi } from "config/abi/types/VaultAbi";
import { VaultsFactoryAbi } from "config/abi/types/VaultsFactoryAbi";
import { getAddress } from "@ethersproject/address";
import {
  BigNumber,
  BigNumberish,
  BytesLike,
  Overrides,
  Contract,
} from "ethers";

import web3 from "web3";
import { IBalances } from "dtos/IBalances";

const GAS_PRICE_GWEI = {
  default: parseUnits("5", "gwei").toString(),
  fast: parseUnits("6", "gwei").toString(),
  instant: parseUnits("7", "gwei").toString(),
  testnet: parseUnits("10", "gwei").toString(),
};

export const veiToEth = (value) => {
  return web3.utils.fromWei(value, "ether");
};

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value.toLowerCase());
  } catch {
    return false;
  }
}

/**
 * Estimate the gas needed to call a function, and add a 10% margin
 * @param contract Used to perform the call
 * @param methodName The name of the methode called
 * @param gasMarginPer10000 The gasMargin per 10000 (i.e. 10% -> 1000)
 * @param args An array of arguments to pass to the method
 * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
const estimateGas = async (
  contract: Contract,
  methodName: string,
  methodArgs: any[],
  gasMarginPer10000: number
) => {
  if (!contract[methodName]) {
    throw new Error(
      `Method ${methodName} doesn't exist on ${contract.address}`
    );
  }

  const rawGasEstimation = await contract.estimateGas[methodName](
    ...methodArgs
  );

  // By convention, BigNumber values are multiplied by 1000 to avoid dealing with real numbers
  const gasEstimation = rawGasEstimation
    .mul(BigNumber.from(10000).add(BigNumber.from(gasMarginPer10000)))
    .div(BigNumber.from(10000));
  return gasEstimation;
};

export const addProfileWithEstimateGas = async (
  contract: VaultsFactoryAbi,
  _profileId: BytesLike,
  _receiver: string,
  _baseToken: string,
  _quoteTokenId: BigNumberish,
  _sellers: string[],
  _buyers: string[],
  overrides?: Overrides
): Promise<TransactionResponse> => {
  const gasEstimation = await estimateGas(
    contract,
    "addVault",
    [_profileId, _receiver, _baseToken, _quoteTokenId, _sellers, _buyers],
    5000
  );
  // const gasEstimation=GAS_PRICE_GWEI.default
  const tx = await contract.addVault(
    _profileId,
    _receiver,
    _baseToken,
    _quoteTokenId,
    _sellers,
    _buyers,
    {
      gasLimit: gasEstimation,
      gasPrice: GAS_PRICE_GWEI.fast,
      ...overrides,
    }
  );
  return tx;
};

export const getBnbBalances = async (
  contract: VaultsFactoryAbi,
  addresses: string[]
): Promise<IBalances> => {
  const data = await contract.callStatic.getBnbBalances(addresses);

  return addresses.reduce((acc, address, index) => {
    acc[address] = data[index] ? veiToEth(data[index].toString()) : "n/a";
    return acc;
  }, {});
};

export const withdrawFromProxyToReceiverWithEstimateGas = async (
  contract: VaultAbi,
  proxyId: BigNumberish,
  token: string,
  overrides?: Overrides
): Promise<TransactionResponse> => {
  const gasEstimation = await estimateGas(
    contract,
    "withdrawFromProxyToReceiver",
    [proxyId, token],
    5000
  );

  const tx = await contract.withdrawFromProxyToReceiver(proxyId, token, {
    gasLimit: gasEstimation,
    ...overrides,
  });
  return tx;
};

export const withdrawFromVaultToDeployerWithEstimateGas = async (
  contract: VaultAbi,
  token: string,
  overrides?: Overrides
): Promise<TransactionResponse> => {
  const gasEstimation = await estimateGas(
    contract,
    "withdrawFromVaultToDeployer",
    [token],
    5000
  );

  const tx = await contract.withdrawFromVaultToDeployer(token, {
    gasLimit: gasEstimation,
    ...overrides,
  });
  return tx;
};

export const addProxy = async (contract: VaultAbi) => {
  const gasEstimation = await estimateGas(contract, "addProxy", [], 5000);
  const tx = await contract.addProxy({
    gasLimit: gasEstimation,
  });
  return tx;
};

export interface IProxy {
  baseTokenBalance: BigNumber;
  quoteTokenBalance: BigNumber;
  proxyAddress: string;
}

export const loadProxies = async (
  vaultContract: VaultAbi
): Promise<IProxy[]> => {
  const list = await vaultContract.getProxyReceivers();

  return list.map(({ baseTokenBalance, quoteTokenBalance, proxyAddress }) => ({
    baseTokenBalance,
    quoteTokenBalance,
    proxyAddress,
  }));
};
