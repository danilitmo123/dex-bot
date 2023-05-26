import React, { FC, useEffect, useState } from "react";
import { useERC20, useVault } from "hooks/useContract";
import refresh from "../../../assets/icons/refresh.svg";
import useAuth from "../../../hooks/useAuth";
import ConnectModal from "../../ConnectModal";
import { truncateAddress } from "../../../utils/wallet";
import { useWeb3React } from "@web3-react/core";
import useCatchTxError from "hooks/useCatchTxError";
import { useToast } from "@chakra-ui/react";
import { default as ToastDescriptionWithTx } from "components/Toast/DescriptionWithTx";
import {
  addProxy,
  IProxy,
  loadProxies,
  withdrawFromProxyToReceiverWithEstimateGas,
} from "utils/contractsHelper";

import { useDisclosure } from "@chakra-ui/react";
import IProfile from "dtos/IProfile";
import ContractInfo from "./ContractInfo";
import VaultContractInfo from "./VaultContractInfo";
import TokenName from "../../TokenName";
import TransferEventEmitter from "../../../utils/TransferEventEmitter";
import EmptyRow from "../../Form/EmptyRow";
import { usePagination } from "../../../hooks/usePagination";

interface iProxy {
  id: number;
  address: string;
  baseTokenBalance: number;
  quoteTokenBalance: number;
}

// for test-view only
interface ContractsProps {
  contracts: {
    vaultAddress: string;
    baseTokenBalance: number;
    quoteTokenBalance: number;
    proxies: iProxy[];
  };
  currentProfile: IProfile;
}

const Contracts: FC<ContractsProps> = ({ currentProfile }) => {
  const { logout } = useAuth();
  const vault = useVault(currentProfile?.vaultAddr, true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchWithCatchTxError } = useCatchTxError();
  const toastSuccess = useToast({ status: "success", position: "top" });
  const [proxies, setProxies] = useState<IProxy[]>([]);
  const baseToken = useERC20(currentProfile.baseTokenAddr);
  const quoteToken = useERC20(currentProfile.quoteTokenAddr);
  const { account, active } = useWeb3React();
  console.log(currentProfile)
  useEffect(() => {
    loadProxies(vault).then((data) => {
      setProxies(data);
    });
  }, [vault]);

  const update = () => {
    loadProxies(vault).then((data) => {
      setProxies(data);
    });
  };

  useEffect(() => {
    const addresses = proxies.map((e) => e.proxyAddress);
    const eventNames = addresses.map((e) => TransferEventEmitter.eventName(e));
    const emitters: TransferEventEmitter[] = [];

    if (baseToken) {
      emitters.push(TransferEventEmitter.factory(baseToken));
      emitters.push(TransferEventEmitter.factory(quoteToken));

      for (const emitter of emitters) {
        emitter.addAddresses(proxies.map((e) => e.proxyAddress));

        for (const eventName of eventNames) {
          emitter.on(eventName, update);
        }
      }
    }

    if (emitters[0]) {
      emitters[0].on(TransferEventEmitter.forceUpdateEventName, update);
    }

    return () => {
      for (const emitter of emitters) {
        for (const eventName of eventNames) {
          emitter.off(eventName, update);
        }
      }
      if (emitters[0]) {
        emitters[0].off(TransferEventEmitter.forceUpdateEventName, update);
      }
    };
  }, [proxies]);

  const handleWithdrawFromProxyToReceiver =
    (proxyId, tokenAddr) => async () => {
      const receipt = await fetchWithCatchTxError(() => {
        return withdrawFromProxyToReceiverWithEstimateGas(
          vault,
          proxyId,
          tokenAddr
        );
      });
      if (receipt?.status) {
        toastSuccess({
          description: (
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              'Withdrawal successful'
            </ToastDescriptionWithTx>
          ),
        });
      }
    };

  const addProxyHandler = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return addProxy(vault);
    });

    if (receipt?.status) {
      toastSuccess({
        description: (
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            'Proxy added successful'
          </ToastDescriptionWithTx>
        ),
      });
      update();
    }
  };

  const hasRightsToActions =
    active &&
    account?.toLowerCase() === currentProfile?.withdrawerAddr?.toLowerCase();

  const updateAll = () => {
    Object.keys(TransferEventEmitter.emitters).forEach((key) => {
      TransferEventEmitter.emitters[key].emit(
        TransferEventEmitter.forceUpdateEventName
      );
    });
  };

  const proxiesList = usePagination(proxies);

  return (
    <>
      <div className="row">
        <div className="col-md-12 text-end">
          <img
            src={refresh}
            style={{
              display: "unset",
              width: "26px",
              cursor: "pointer",
              marginRight: 10,
            }}
            role="button"
            onClick={updateAll}
          />
          {!active ? (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              style={{ marginRight: 10 }}
              onClick={onOpen}
            >
              Connect Wallet
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success btn-sm"
              style={{ marginRight: 10 }}
              onClick={logout}
            >
              {truncateAddress(account)}
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            disabled={!hasRightsToActions}
            onClick={addProxyHandler}
          >
            Add Proxy
          </button>
        </div>
      </div>
      <div className="table-responsive-sm">
        <table className="table-striped table-hover table-bordered mt-3 table">
          <thead>
            <tr>
              <th scope="col">Address</th>
              <th scope="col">Type</th>
              <th scope="col">
                <TokenName
                  address={currentProfile.baseTokenAddr}
                  replacer={"Base Token"}
                />{" "}
                Balance
              </th>
              <th scope="col">
                <TokenName
                  address={currentProfile.quoteTokenAddr}
                  replacer={"Quote Token"}
                />{" "}
                Balance
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!vault && proxies.length === 0 && <EmptyRow rows={4} />}
            {vault && (
              <VaultContractInfo
                vault={vault}
                currentProfile={currentProfile}
              />
            )}
            {proxiesList.list.map((el, id) => (
              <ContractInfo
                key={el.proxyAddress}
                address={el.proxyAddress}
                type="proxy"
                baseBalance={el.baseTokenBalance.toString()}
                quoteBalance={el.quoteTokenBalance.toString()}
                onWithdrawBase={handleWithdrawFromProxyToReceiver(
                  id,
                  currentProfile.baseTokenAddr
                )}
                onWithdrawQuote={handleWithdrawFromProxyToReceiver(
                  id,
                  currentProfile.quoteTokenAddr
                )}
              />
            ))}
          </tbody>
        </table>
      </div>
      {proxiesList.pagination}

      <ConnectModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
};

export default Contracts;
