import { StaticJsonRpcProvider } from "@ethersproject/providers";

import chains, { SupportedChainsIds } from "../config/chains";

export const CHAIN_ID = SupportedChainsIds.BSC_MAINET;
export const RPC_URL = chains[CHAIN_ID].rpcUrl;

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL);

export function getBscScanLink(
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown",
  chainIdOverride?: number
): string {
  const chainId = chainIdOverride || CHAIN_ID;
  switch (type) {
    case "transaction": {
      return `${chains[chainId].explorerUrl}/tx/${data}`;
    }
    case "token": {
      return `${chains[chainId].explorerUrl}/token/${data}`;
    }
    case "block": {
      return `${chains[chainId].explorerUrl}/block/${data}`;
    }
    case "countdown": {
      return `${chains[chainId].explorerUrl}/block/countdown/${data}`;
    }
    default: {
      return `${chains[chainId].explorerUrl}/address/${data}`;
    }
  }
}

export default null;
