export type WalletConfig = {
  icon: string;
  title: string;
  connectorId: string;
};

export const connectorLocalStorageKey = "connectorId";

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  CoinbaseWallet = "coinbaseWallet",
}
