import BlackListContext, { IBlackListContext } from "contexts/BlackListContext";
import { IBlackListElement } from "dtos/IBlackListElement";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import { apiUrl, get, post, remove as _remove } from "utils/fetcher";

type Props = {
  children: React.ReactNode;
  profileId: number;
};

export default function BlackListProvider({ children, profileId }: Props) {
  const blackListData: SWRResponse<IBlackListElement[]> = useSWR(
    apiUrl(`/blacklist/all?profileId=${profileId}`),
    get
  );

  const create: IBlackListContext["create"] = async (el) => {
    await post(apiUrl("/blacklist/"), el);
    await blackListData?.mutate();
  };

  const update: IBlackListContext["update"] = () => {
    // do nothing
  };

  const remove: IBlackListContext["remove"] = async (id) => {
    await _remove(apiUrl(`/blacklist/${id}`));
    await blackListData?.mutate();
  };

  return (
    <BlackListContext.Provider
      value={{ list: blackListData?.data || [], create, update, remove }}
    >
      {children}
    </BlackListContext.Provider>
  );
}
