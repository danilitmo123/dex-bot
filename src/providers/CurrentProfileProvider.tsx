import React from "react";
import { CurrentProfileContext } from "../contexts/CurrentProfileContext";
import { useParams } from "react-router-dom";
import useSWR, { SWRResponse } from "swr";
import IProfile from "../dtos/IProfile";
import { apiUrl, get } from "../utils/fetcher";
import { useWeb3React } from "@web3-react/core";

type CurrentProfileProviderProps = {
  children: React.ReactNode;
};

const CurrentProfileProvider: React.FC<CurrentProfileProviderProps> = ({
  children,
}) => {
  const { account, active } = useWeb3React();
  const pathParams = useParams<{ id?: string; tab?: string }>();
  const profileId = pathParams.id ? +pathParams.id : undefined;
  const profileData: SWRResponse<IProfile> = useSWR(
    profileId ? apiUrl(`/profile/${profileId}`) : null,
    get
  );
  const currentProfile = profileData.data;

  const hasRights =
    active &&
    account?.toLowerCase() === currentProfile?.withdrawerAddr?.toLowerCase();

  return (
    <CurrentProfileContext.Provider
      value={{
        currentProfile,
        hasRights,
      }}
    >
      {children}
    </CurrentProfileContext.Provider>
  );
};

export default CurrentProfileProvider;
