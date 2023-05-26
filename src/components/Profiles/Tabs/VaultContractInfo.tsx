import React, { useEffect, useState } from "react";
import { VaultAbi } from "../../../config/abi/types";
import { useERC20 } from "../../../hooks/useContract";
import { BigNumber } from "ethers";
import { withdrawFromVaultToDeployerWithEstimateGas } from "../../../utils/contractsHelper";
import useCatchTxError from "../../../hooks/useCatchTxError";
import { useToast } from "@chakra-ui/react";
import { default as ToastDescriptionWithTx } from "components/Toast/DescriptionWithTx";
import IProfile from "../../../dtos/IProfile";
import ContractInfo from "./ContractInfo";
import TransferEventEmitter from "../../../utils/TransferEventEmitter";

type ContractInfoProps = {
  vault: VaultAbi;
  currentProfile: IProfile;
};

const VaultContractInfo: React.FC<ContractInfoProps> = ({
  vault,
  currentProfile,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError();
  const toastSuccess = useToast({ status: "success", position: "top" });
  const [baseBalance, setbaseBalance] = useState<BigNumber>(
    BigNumber.from("0")
  );
  const [quoteBalance, setquoteBalance] = useState<BigNumber>(
    BigNumber.from("0")
  );

  const baseToken = useERC20(currentProfile.baseTokenAddr);
  const quoteToken = useERC20(currentProfile.quoteTokenAddr);

  const loadBalances = () => {
    const { address } = vault;
    baseToken.balanceOf(address).then((value) => setbaseBalance(value));
    quoteToken.balanceOf(address).then((value) => setquoteBalance(value));
  };

  const update = () => {
    loadBalances();
  };

  useEffect(() => {
    const { address } = vault;
    const eventName = TransferEventEmitter.eventName(address);
    const emitters: TransferEventEmitter[] = [];

    emitters.push(TransferEventEmitter.factory(baseToken));
    emitters.push(TransferEventEmitter.factory(quoteToken));

    for (const emitter of emitters) {
      emitter.addAddress(address);
      emitter.on(eventName, update);
    }

    if (emitters[0]) {
      emitters[0].on(TransferEventEmitter.forceUpdateEventName, update);
    }

    loadBalances();

    return () => {
      for (const emitter of emitters) {
        emitter.off(eventName, update);
        emitter.off(TransferEventEmitter.forceUpdateEventName, update);
      }
      if (emitters[0]) {
        emitters[0].off(TransferEventEmitter.forceUpdateEventName, update);
      }
    };
  }, []);

  const handleWithdrawFromVaultToDeployer = (tokenAddr) => async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return withdrawFromVaultToDeployerWithEstimateGas(vault, tokenAddr);
    });

    if (receipt?.status) {
      toastSuccess({
        description: (
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            'Withdrawal successful'
          </ToastDescriptionWithTx>
        ),
      });
      // update main vault balance in store
    }
  };

  return (
    <ContractInfo
      address={vault.address}
      type="main"
      onWithdrawBase={handleWithdrawFromVaultToDeployer(
        currentProfile.baseTokenAddr
      )}
      onWithdrawQuote={handleWithdrawFromVaultToDeployer(
        currentProfile.quoteTokenAddr
      )}
      baseBalance={baseBalance.toString()}
      quoteBalance={quoteBalance.toString()}
    />
  );
};

export default VaultContractInfo;
