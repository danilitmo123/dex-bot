import classNames from "classnames";
import IProfile from "dtos/IProfile";
import React, { FC, useEffect, useState } from "react";
import getTokenInfo from "utils/getTokenInfo";
import CopyIcon from "../Icons/CopyIcon";
import fromat from "date-fns/format";

const ProfileDetails: FC<{ profile: IProfile }> = ({ profile }) => {
  const [tokenNames, setTokenNames] = useState<{ base: string; quote: string }>(
    { base: "-", quote: "" }
  );

  const loadTokenNames = async () => {
    const base = await getTokenInfo(profile.baseTokenAddr);
    const quote = await getTokenInfo(profile.quoteTokenAddr);

    setTokenNames({
      base: base.symbol,
      quote: quote.symbol,
    });
  };

  useEffect(() => {
    if (profile) {
      loadTokenNames();
    }
  }, [profile]);

  return (
    <div className="table-responsive">
      <table className="table-striped table-hover table-bordered mt-2 table">
        <tbody>
          <tr>
            <td>Profile Id</td>
            <td>{profile.id}</td>
          </tr>
          <tr>
            <td>Profile Name</td>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <td>Dex</td>
            <td>{profile.dex}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <span
                className={classNames(
                  "badge",
                  profile.status === "waiting"
                    ? "text-bg-warning"
                    : profile.status === "active"
                    ? "text-bg-success"
                    : "text-bg-danger"
                )}
              >
                {profile.status}
              </span>
            </td>
          </tr>
          <tr>
            <td>Main Receiver Address</td>
            <td>
              <CopyIcon text={profile.mainReceiverAddr} />
              {profile.mainReceiverAddr}
            </td>
          </tr>

          <tr>
            <td>Vault Address</td>
            <td>
              <CopyIcon text={profile.vaultAddr} />
              {profile.vaultAddr}
            </td>
          </tr>
          <tr>
            <td>Withdrawer</td>
            <td>
              <CopyIcon text={profile.withdrawerAddr} />
              {profile.withdrawerAddr}
            </td>
          </tr>

          <tr>
            <td>Base Token</td>
            <td>
              <CopyIcon text={profile.baseTokenAddr} />
              {tokenNames.base.toUpperCase()} {profile.baseTokenAddr}
            </td>
          </tr>
          <tr>
            <td>Quote Token</td>
            <td>
              <CopyIcon text={profile.quoteTokenAddr} />
              {tokenNames.quote.toUpperCase()} {profile.quoteTokenAddr}
            </td>
          </tr>

          <tr>
            <td>Sellers Count</td>
            <td>{profile.sellersCount}</td>
          </tr>
          <tr>
            <td>Buyers Count</td>
            <td>{profile.buyersCount}</td>
          </tr>
          {/*<tr>*/}
          {/*  <td>Receivers Count</td>*/}
          {/*  <td>profile.receivers_count???</td>*/}
          {/*</tr>*/}
          {/*<tr>*/}
          {/*  <td>Fee Percent</td>*/}
          {/*  <td>profile.fee_percent??</td>*/}
          {/*</tr>*/}
          <tr>
            <td>Gas Limit</td>
            <td>{profile.gasLimit}</td>
          </tr>
          <tr>
            <td>Max Price Impact Per Transaction</td>
            <td>{profile.maxPriceImpact / 10}</td>
          </tr>
          <tr>
            <td>Proxy-Receiver Max BaseToken Balance</td>
            <td>{profile.proxyMaxBaseBalance}</td>
          </tr>
          <tr>
            <td>Proxy-Receiver Max QuoteToken Balance</td>
            <td>{profile.proxyMaxQuoteBalance}</td>
          </tr>
          <tr>
            <td>Min Amount For Triggering</td>
            <td>{profile.minTriggeringAmount}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>
              {profile.createdAt
                ? fromat(new Date(profile.createdAt), "MMM dd, yyyy HH:mm:ss")
                : "-"}
            </td>
          </tr>
          <tr>
            <td>Updated At</td>
            <td>
              {profile.updatedAt
                ? fromat(new Date(profile.updatedAt), "MMM dd, yyyy HH:mm:ss")
                : "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileDetails;
