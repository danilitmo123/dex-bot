import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import strategiesCfg from "../../config/constants/strategies";
import contractsCfg from "../../config/constants/contracts";
import PageLayout from "../../layout/Layout";
import ProfileDetails from "./ProfileDetails";
import Strategies from "../Strategies/Strategies";
import Accounts from "./Tabs/Accounts";
import Blacklist from "./Tabs/Blacklist";
import Contracts from "./Tabs/Contracts";
import arrowBack from "../../assets/icons/arrow_back.svg";
import info from "../../assets/icons/info.svg";
import useSWR, { SWRResponse } from "swr";
import { apiUrl, get } from "utils/fetcher";
import IProfile from "dtos/IProfile";
import useProfiles from "hooks/useProfiles";
import BlackListProvider from "providers/BlackListProvider";
import { abbreviateAddress } from "utils/abbreveareAddress";
import StrategiesProvider from "../../providers/StrategiesProvider";
import { useToast } from "@chakra-ui/react";
import TokenName from "../TokenName";
import useCurrentProfile from "../../hooks/useCurrentProfile";
import { useWeb3React } from "@web3-react/core";

const tabs: { name: string; value: string }[] = [
  { value: "strategies", name: "Strategies" },
  { value: "trade_accounts", name: "Trade Accounts" },
  { value: "vault_contracts", name: "Vault Contracts" },
  { value: "blacklist", name: "Blacklist" },
  { value: "profile_info", name: "Profile info" },
];

const ProfileInfo = () => {
  const [loading, setloading] = useState<boolean>(false);
  const pathParams = useParams<{ id?: string; tab?: string }>();
  const { deleteProfile } = useProfiles();
  const history = useHistory();
  const toastError = useToast({ status: "error", position: "top" });
  const { account, active } = useWeb3React();
  const { controlProfile } = useProfiles();

  const profileId = pathParams.id ? +pathParams.id : undefined;

  const currentTab = pathParams.tab || "strategies";
  const setTab = (tab) => {
    history.push(`/profile/${profileId}/${tab}`);
  };

  const profileData: SWRResponse<IProfile> = useSWR(
    profileId ? apiUrl(`/profile/${profileId}`) : null,
    get
  );

  const { currentProfile } = useCurrentProfile();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Are you sure?")) {
      if (currentProfile?.id) {
        await deleteProfile(currentProfile.id);
        history.push("/profiles");
      }
    }
  };

  useEffect(() => {
    if (profileData?.error) {
      toastError({
        description: profileData.error.message || "Can not load profile data",
      });
      history.push("/profiles");
    }
  }, [profileData?.error]);

  useEffect(() => {
    setloading(false);
  }, [profileData.data]);

  const changeProfileState = (value: "start" | "stop") => async () => {
    setloading(true);
    await controlProfile(currentProfile.id, value);
    profileData.mutate();
  };

  return (
    <PageLayout>
      {currentProfile ? (
        <BlackListProvider profileId={currentProfile.id}>
          <div className="row">
            <div className="col-md-1 col-2">
              <Link to="/profiles">
                <img
                  style={{ width: "40px", cursor: "pointer" }}
                  src={arrowBack}
                />
              </Link>
            </div>
            <div className="col-md-5 col-10">
              <h3>
                {currentProfile.name}{" "}
                <span>
                  (
                  <TokenName address={currentProfile.baseTokenAddr} />
                  {" / "}
                  <TokenName address={currentProfile.quoteTokenAddr} />)
                </span>
              </h3>
              <div className="network-ttl">
                Network: <b>{currentProfile.dex}</b>
              </div>
              <h3>
                Withdrawer:{" "}
                <span>{abbreviateAddress(currentProfile.withdrawerAddr)}</span>
                <div className="d-inline-block tooltipItem">
                  <img
                    src={info}
                    style={{
                      display: "unset",
                      width: "24px",
                      cursor: "pointer",
                      marginLeft: 10,
                    }}
                  />
                  <div className="tooltipArea" style={{ marginLeft: 5 }}>
                    It should be connected before tokens withdraw action.
                  </div>
                </div>
              </h3>
            </div>
            <div className="col-md-6 col-12 text-start text-md-end mt-md-0 mt-3">
              <Link
                type="button"
                className="btn btn-outline-secondary btn-sm"
                to={`/edit-profile/${currentProfile.id}`}
                style={{ marginRight: 10 }}
              >
                Edit Profile
              </Link>
              {currentProfile.status === "active" && (
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  style={{ marginRight: 10 }}
                  disabled={loading}
                  onClick={changeProfileState("stop")}
                >
                  Stop Profile
                </button>
              )}
              {currentProfile.status === "stopped" && (
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm"
                  style={{ marginRight: 10 }}
                  disabled={loading}
                  onClick={changeProfileState("start")}
                >
                  Start Profile
                </button>
              )}
              <a
                type="button"
                className="btn btn-outline-danger btn-sm"
                href="#"
                onClick={handleDelete}
              >
                Delete Profile
              </a>
            </div>
          </div>

          <nav className="d-sm-block d-xs-block d-md-none mt-5">
            <div className="nav nav-pills nav-fill" id="nav-tab" role="tablist">
              {tabs.map((tab) => (
                <button
                  onClick={() => setTab(tab.value)}
                  className={
                    currentTab === tab.value ? "nav-link active" : "nav-link"
                  }
                  type="button"
                  key={tab.value}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </nav>

          <nav className="d-none d-sm-none d-xs-none d-md-block mt-5">
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              {tabs.map((tab) => (
                <button
                  onClick={() => setTab(tab.value)}
                  className={
                    currentTab === tab.value ? "nav-link active" : "nav-link"
                  }
                  type="button"
                  key={tab.value}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </nav>
          <div className="tab-content pt-3">
            <div
              className={
                currentTab === "strategies"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
            >
              <StrategiesProvider profileId={currentProfile.id}>
                <Strategies
                  strategies={strategiesCfg}
                  profileId={currentProfile.id}
                />
              </StrategiesProvider>
            </div>
            <div
              className={
                currentTab === "trade_accounts"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
            >
              <Accounts
                accounts={currentProfile.addresses}
                hash={currentProfile.hash}
              />
            </div>
            <div
              className={
                currentTab === "vault_contracts"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
            >
              <Contracts
                contracts={contractsCfg}
                currentProfile={currentProfile}
              />
            </div>
            <div
              className={
                currentTab === "blacklist"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
            >
              <Blacklist profileId={currentProfile.id} />
            </div>
            <div
              className={
                currentTab === "profile_info"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
            >
              <ProfileDetails profile={currentProfile} />
            </div>
          </div>
          {active &&
            account?.toLowerCase() !==
              currentProfile.withdrawerAddr?.toLowerCase() && (
              <div className="alert alert-warning" role="alert">
                To get full access to this profile, please connect account{" "}
                {abbreviateAddress(currentProfile.withdrawerAddr, 6)}
              </div>
            )}
        </BlackListProvider>
      ) : (
        <h2>Profile not found!</h2>
      )}
    </PageLayout>
  );
};

export default ProfileInfo;
