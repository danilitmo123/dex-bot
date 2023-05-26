import chains, { SupportedChainsIds } from "../config/chains";

export type ExternalProvider = {
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void;
  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void;
  request?: (request: { method: string; params?: Array<any> }) => Promise<any>;
};

export const truncateAddress = (address: string | null | undefined) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const setupNetwork = async (externalProvider?: ExternalProvider) => {
  const provider = externalProvider || window.ethereum;
  if (provider) {
    const chainId = SupportedChainsIds.BSC_MAINET;
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return "success";
    } catch (error) {
      if ((error as any)?.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: chains[chainId].name,
                nativeCurrency: {
                  name: "BNB",
                  symbol: "bnb",
                  decimals: 18,
                },
                rpcUrls: chains[chainId].rpcUrl,
                blockExplorerUrls: [chains[chainId].explorerUrl],
              },
            ],
          });
          return "success";
        } catch (switchError) {
          console.log(
            "Failed to setup the network in Metamask:",
            (switchError as any)?.message
          );
          return (switchError as any)?.message;
        }
      } else if ((error as any)?.code === -32002) {
        console.log("Setup the network in Metamask:", (error as any)?.message);
        return "Please open wallet and switch network";
      }
      console.log("Setup the network in Metamask:", (error as any)?.message);
      return (error as any)?.message;
    }
  } else {
    console.log(
      "Can't setup the network on metamask because window.ethereum is undefined"
    );
    return "Can't setup the network on metamask because window.ethereum is undefined";
  }
};
