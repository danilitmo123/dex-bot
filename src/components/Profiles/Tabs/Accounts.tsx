import React, { FC, useEffect, useState } from "react";
import info from "../../../assets/icons/info.svg";
import classNames from "classnames";
import { getBnbBalances } from "utils/contractsHelper";
import { useVaultsFactory } from "hooks/useContract";
import { IBalances } from "dtos/IBalances";
import CopyIcon from "../../Icons/CopyIcon";
import { abbreviateAddress } from "utils/abbreveareAddress";
import { apiUrl, post } from "../../../utils/fetcher";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { default as ToastDescriptionWithTx } from "components/Toast/DescriptionWithTx";
import { usePagination } from "../../../hooks/usePagination";
import useCurrentProfile from "../../../hooks/useCurrentProfile";
import refresh from "../../../assets/icons/refresh.svg";
import { truncateAddress } from "../../../utils/wallet";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../../hooks/useAuth";
import ConnectModal from "../../ConnectModal";

interface AccountsProps {
  accounts: {
    buyer: string[];
    seller: string[];
  };
  hash: string;
}

type AccountType = "buyer" | "seller";

interface IAccount {
  address: string;
  type: AccountType;
}

enum AccountTypeName {
  buyer = "Buyer",
  seller = "Seller",
}

const Accounts: FC<AccountsProps> = ({ accounts, hash }) => {
  const [loading, setLoading] = useState<{
    [address: string]: boolean;
  }>({});
  const vaultsFactoryContract = useVaultsFactory(true);
  const [balances, setBalances] = useState<IBalances>({});
  const toastSuccess = useToast({ status: "success", position: "top" });
  const toastError = useToast({ status: "error", position: "top" });
  const { hasRights } = useCurrentProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, active } = useWeb3React();
  const { logout } = useAuth();

  const _accounts: IAccount[] = [
    ...accounts.buyer.map(
      (address): IAccount => ({
        address,
        type: "buyer",
      })
    ),
    ...accounts.seller.map(
      (address): IAccount => ({
        address,
        type: "seller",
      })
    ),
  ];

  const accountsList = usePagination<IAccount>(_accounts);

  const loadBalances = async () => {
    const balances = await getBnbBalances(vaultsFactoryContract, [
      ..._accounts.map(({ address }) => address),
    ]);
    setBalances(balances);
  };

  useEffect(() => {
    let interval;
    if (_accounts.length) {
      interval = setInterval(() => {
        loadBalances();
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [_accounts.join(",")]);

  const withdraw = (address: string) => async () => {
    setLoading((values) => ({
      ...values,
      [address]: true,
    }));
    const data = await post(apiUrl("/profile/withdraw"), { address, hash });
    if (!data.hash) {
      toastError({
        description: data.message || "Error",
      });
    } else {
      setBalances((values) => ({
        ...values,
        [address]: "0",
      }));
      toastSuccess({
        description: (
          <ToastDescriptionWithTx txHash={data.hash}>
            'Withdrawal successful'
          </ToastDescriptionWithTx>
        ),
      });
    }
    setLoading((values) => ({
      ...values,
      [address]: false,
    }));
  };

  return (
    <>
      <div className="alert alert-info" role="alert">
        These Addresses will trigger operations on Main Vault. Addresses will
        become active and start operations as soon as they will have Native
        currency for gas.
      </div>

      <div className="row">
        <div className="col-md-12 text-end">
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
        </div>
      </div>

      <div className="table-responsive">
        <table className="table-striped table-hover table-bordered mt-3 table">
          <thead>
            <tr>
              <th scope="col">Address</th>
              <th scope="col">Type</th>
              <th scope="col">Native Balance (BNB)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {accountsList.list.map((account) => (
              <tr key={account.address}>
                <td>
                  <CopyIcon text={account.address} />
                  {abbreviateAddress(account.address, 6)}
                </td>
                <td>
                  <span
                    className={classNames(
                      "badge",
                      account.type === "seller"
                        ? "text-bg-danger"
                        : "text-bg-success"
                    )}
                  >
                    {AccountTypeName[account.type]}
                  </span>
                </td>
                <td>{balances[account.address] || "..."}</td>
                <td className="text-center">
                  <button
                    onClick={withdraw(account.address)}
                    className="btn btn-outline-secondary btn-sm btn-withdrawal"
                    disabled={
                      !hasRights ||
                      loading[account.address] ||
                      !balances[account.address] ||
                      +balances[account.address] === 0
                    }
                  >
                    Withdrawal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {accountsList.pagination}
      <ConnectModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
};

export default Accounts;
