import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Web3Provider } from "@ethersproject/providers";
import { ConnectorNames } from "../config/constants/wallets";
import chains, { SupportedChainsIds } from "../config/chains";

const POLLING_INTERVAL = 12000;

const chainId = SupportedChainsIds.BSC_MAINET;
const { rpcUrl } = chains[chainId];

const injected = new InjectedConnector({ supportedChainIds: [chainId] });

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const getLibrary = (provider): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.CoinbaseWallet]: async () => {
    const { WalletLinkConnector } = await import(
      "@web3-react/walletlink-connector"
    );
    return new WalletLinkConnector({
      url: rpcUrl,
      appName: "MMPRO",
      supportedChainIds: [chainId],
    });
  },
} as const;
