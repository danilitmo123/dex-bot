import React from "react";
import CopyIcon from "../../Icons/CopyIcon";
import { abbreviateAddress } from "../../../utils/abbreveareAddress";
import classNames from "classnames";
import IProfile from "../../../dtos/IProfile";
import { useERC20 } from "../../../hooks/useContract";
import useTokenPrice from "../../../hooks/useTokenPrice";
import TokenName from "../../TokenName";
import useCurrentProfile from "../../../hooks/useCurrentProfile";

enum TypeNames {
  main = "Main",
  proxy = "Proxy-Receiver",
}

type ContractInfoProps = {
  address: string;
  type: "main" | "proxy";
  baseBalance?: string;
  quoteBalance?: string;
  onWithdrawBase: () => Promise<void>;
  onWithdrawQuote: () => Promise<void>;
};

const ContractInfo: React.FC<ContractInfoProps> = ({
  address,
  type,
  baseBalance,
  quoteBalance,
  onWithdrawBase,
  onWithdrawQuote,
}) => {
  const { hasRights, currentProfile } = useCurrentProfile();

  const baseToken = useERC20(currentProfile?.baseTokenAddr);
  const quoteToken = useERC20(currentProfile?.quoteTokenAddr);

  const { value: baseTokenBalance } = useTokenPrice(baseToken, baseBalance);
  const { value: quoteTokenBalance } = useTokenPrice(quoteToken, quoteBalance);

  return (
    <tr>
      <td>
        <CopyIcon text={address} />
        {abbreviateAddress(address)}
      </td>
      <td>
        <span
          className={classNames(
            "badge",
            type === "main" ? "text-bg-success" : "text-bg-warning"
          )}
        >
          {TypeNames[type]}
        </span>
      </td>
      <td>{baseTokenBalance}</td>
      <td>{quoteTokenBalance}</td>
      <td>
        <div className="dropdown d-inline-block">
          <button
            className="btn btn-outline-secondary btn-sm btn-withdrawal dropdown-toggle"
            type="button"
            disabled={!hasRights}
          >
            Actions
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className={classNames(
                  "dropdown-item",
                  +baseTokenBalance === 0 && "disabled"
                )}
                href="#"
                onClick={onWithdrawBase}
              >
                Withdraw{" "}
                <TokenName
                  address={currentProfile.baseTokenAddr}
                  replacer={"Base Token"}
                />
              </a>
            </li>
            <li>
              <a
                className={classNames(
                  "dropdown-item",
                  +quoteTokenBalance === 0 && "disabled"
                )}
                href="#"
                onClick={onWithdrawQuote}
              >
                Withdraw{" "}
                <TokenName
                  address={currentProfile.quoteTokenAddr}
                  replacer={"Base Token"}
                />
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default ContractInfo;
