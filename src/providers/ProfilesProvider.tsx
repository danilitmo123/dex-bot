import { IProfilesContext, ProfilesContext } from "contexts/ProfilesContext";
import { IEditProps } from "dtos/IEditProps";
import IProfile from "dtos/IProfile";
import useBackendAuth from "hooks/useBackendAuth";
import React, { useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import { apiUrl, get, patch, post, remove } from "utils/fetcher";

const quoteTokenAddresses = [
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", //WBNB
  "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3", //DAI
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", //USDC
  "0x55d398326f99059fF775485246999027B3197955", //USDT
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", //BUSD
];

export const quoteTokenAddressesMapIds: {
  [key: string]: string;
} = quoteTokenAddresses.reduce((acc, el, index) => {
  acc[el.toLowerCase()] = index.toString();
  return acc;
}, {});

const encodeProfileAddProps = (data: IEditProps): any => ({
  userId: +data.userId,
  name: data.name,
  dex: data.dex,
  baseTokenAddr: data.baseTokenAddr,
  quoteTokenAddr: quoteTokenAddresses[data.__quoteTokenId],
  mainReceiverAddr: data.mainReceiverAddr,
  withdrawerAddr: data.withdrawerAddr,
  sellersCount: +data.sellersCount,
  buyersCount: +data.buyersCount,
  gasLimit: +data.gasLimit,
  proxyMaxBaseBalance: +data.proxyMaxBaseBalance,
  proxyMaxQuoteBalance: +data.proxyMaxQuoteBalance,
  maxPriceImpact: Number.parseInt((data.maxPriceImpact * 10).toFixed(0)), //10% => 100
  minTriggeringAmount: +data.minTriggeringAmount,
});

const encodeProfileEditProps = (data: IEditProps): any => ({
  name: data.name,
  gasLimit: +data.gasLimit,
  maxPriceImpact: Number.parseInt((data.maxPriceImpact * 10).toFixed(0)), //10% => 100
  minTriggeringAmount: +data.minTriggeringAmount,
});

interface ProfilesProviderProps {
  children: React.ReactNode;
}

const ProfilesProvider: React.FC<ProfilesProviderProps> = ({ children }) => {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const { userId } = useBackendAuth();

  const { data, mutate }: SWRResponse<IProfile[]> = useSWR(
    userId ? apiUrl(`/profile/all?userId=${userId}`) : null,
    get
  );

  useEffect(() => {
    if (data && data.length) {
      setProfiles(data);
    }
  }, [data]);

  const load = () => {};

  const apiRequestAndUpdate = async (cb: () => Promise<any>) => {
    const result = await cb();
    await mutate();
    return result;
  };

  const addProfile = async (data: IEditProps): Promise<any> => {
    return apiRequestAndUpdate(
      async () => await post(apiUrl("/profile"), encodeProfileAddProps(data))
    );
  };

  const deleteProfile = async (id: number): Promise<any> => {
    return apiRequestAndUpdate(
      async () => await remove(apiUrl(`/profile/${id}`))
    );
  };

  const updateProfile = async (data: IEditProps): Promise<any> => {
    return apiRequestAndUpdate(
      async () =>
        await patch(apiUrl(`/profile/${data.id}`), encodeProfileEditProps(data))
    );
  };

  const controlProfile: IProfilesContext["controlProfile"] = async (
    id,
    status
  ): Promise<IProfile> => {
    return apiRequestAndUpdate(
      async () => await patch(apiUrl(`/profile/${id}/control`), { status })
    );
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        load,
        addProfile,
        deleteProfile,
        updateProfile,
        controlProfile,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};

export default ProfilesProvider;
