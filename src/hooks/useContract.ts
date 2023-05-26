import { useMemo } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import chains from "config/chains";
import { VaultsFactoryAbi__factory } from "config/abi/types/factories/VaultsFactoryAbi__factory";
import { VaultAbi__factory } from "config/abi/types/factories/VaultAbi__factory";
import { MulticallAbi__factory } from "config/abi/types/factories/MulticallAbi__factory";
import { Erc20Abi__factory } from "config/abi/types/factories/Erc20Abi__factory";
import { simpleRpcProvider } from "utils/providers";

function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is not optional
function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export const useVaultsFactory = (withSignerIfPossible = true) => {
  const { library, account, chainId } = useActiveWeb3React();
  const signer = useMemo(
    () =>
      withSignerIfPossible
        ? getProviderOrSigner(library, account)
        : simpleRpcProvider,
    [withSignerIfPossible, library, account]
  );
  // console.log("signer=", signer);
  return useMemo(
    () =>
      VaultsFactoryAbi__factory.connect(chains[chainId].vaultsFactory, signer),
    [chainId, signer]
  );
};

export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React();
  const signer = useMemo(
    () =>
      withSignerIfPossible
        ? getProviderOrSigner(library, account)
        : simpleRpcProvider,
    [withSignerIfPossible, library, account]
  );
  return useMemo(
    () => (address ? Erc20Abi__factory.connect(address, signer) : undefined),
    [address, signer]
  );
};

export const useVault = (address: string, withSignerIfPossible = true) => {
  if (!address) {
    return null;
  }
  const { library, account } = useActiveWeb3React();
  const signer = useMemo(
    () =>
      withSignerIfPossible
        ? getProviderOrSigner(library, account)
        : simpleRpcProvider,
    [withSignerIfPossible, library, account]
  );
  // console.log("===useVault signer:", signer);
  return useMemo(
    () => VaultAbi__factory.connect(address, signer),
    [address, signer]
  );
};

export const useMulticall = () => {
  const { chainId } = useActiveWeb3React();
  return useMemo(
    () =>
      MulticallAbi__factory.connect(
        chains[chainId].mulltiCall,
        simpleRpcProvider
      ),
    [chainId]
  );
};
