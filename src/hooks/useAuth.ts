import { useCallback } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import {
  ConnectorNames,
  connectorLocalStorageKey,
} from "../config/constants/wallets";
import { connectorsByName } from "../utils/web3React";
import { setupNetwork } from "../utils/wallet";
import { useToast } from "@chakra-ui/react";
import Storage from "../utils/storageHelper";

const LStorage = new Storage();

const useAuth = () => {
  // const dispatch = useAppDispatch()
  const { activate, deactivate, setError } = useWeb3React();
  const toastError = useToast({ status: "error", position: "top" });

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      const connectorOrGetConnector = connectorsByName[connectorID];
      const connector =
        typeof connectorOrGetConnector !== "function"
          ? connectorsByName[connectorID]
          : await connectorOrGetConnector();
      if (typeof connector !== "function" && connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            setError(error);
            const provider = await connector.getProvider();
            const hasSetup = await setupNetwork(provider);
            if (hasSetup === "success") {
              activate(connector);
            } else {
              if (!toastError.isActive("toastError-1")) {
                toastError({
                  id: "toastError-1",
                  title: "setupNetwork Error",
                  description: hasSetup,
                });
              }
            }
          } else {
            window?.localStorage?.removeItem(connectorLocalStorageKey);
            if (error instanceof NoEthereumProviderError) {
              if (!toastError.isActive("toastError-2")) {
                toastError({
                  id: "toastError-2",
                  title: "Provider Error",
                  description: "No provider was found",
                });
              }
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = null;
              }
              if (!toastError.isActive("toastError-3")) {
                toastError({
                  id: "toastError-3",
                  title: "Authorization Error",
                  description: "Please authorize to access your account",
                });
              }
            } else {
              if (!toastError.isActive("toastError-4")) {
                toastError({
                  id: "toastError-4",
                  title: error.name,
                  description: error.message,
                });
              }
            }
          }
        });
      } else {
        window?.localStorage?.removeItem(connectorLocalStorageKey);
        if (!toastError.isActive("toastError-5")) {
          toastError({
            id: "toastError-5",
            title: "Can't find connector",
            description: "The connector config is wrong",
          });
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [activate, toastError, setError]
  );

  const logout = useCallback(() => {
    deactivate();
    LStorage.clearItem(connectorLocalStorageKey);
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
