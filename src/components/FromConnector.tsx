import { useDisclosure } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import useAuth from "hooks/useAuth";
import React from "react";
import { truncateAddress } from "utils/wallet";
import ConnectModal from "./ConnectModal";

export default function FromConnector() {
  const { account, active } = useWeb3React();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { logout } = useAuth();

  return (
    <div className="row mb-3">
      <div className="col-md-12 center">
        {!active ? (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            style={{ marginRight: 40 }}
            onClick={onOpen}
          >
            Connect Wallet
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success btn-sm"
            style={{ marginRight: 40 }}
            onClick={logout}
          >
            {truncateAddress(account)}
          </button>
        )}
      </div>
      <ConnectModal isOpen={isOpen} closeModal={onClose} />
    </div>
  );
}
