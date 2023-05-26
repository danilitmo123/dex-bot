import StrategiesContext, {
  IStrategiesContext,
} from "contexts/StrategiesContext";
import { IStrategy } from "dtos/IStrategy";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import { apiUrl, get, post, remove as _remove, patch } from "utils/fetcher";

const decode = (strategy: IStrategy): IStrategy => ({
  ...strategy,
  fill: strategy.fill / 10,
});

const encode = (strategy: IStrategy): IStrategy => ({
  ...strategy,
  fill: strategy.fill * 10,
});

type Props = {
  children: React.ReactNode;
  profileId: number;
};

export default function StrategiesProvider({ children, profileId }: Props) {
  const strategiesData: SWRResponse<IStrategy[]> = useSWR(
    apiUrl(`/strategy/all?profileId=${profileId}`),
    get
  );

  const create: IStrategiesContext["create"] = async (el) => {
    const result = await post(
      apiUrl("/strategy/"),
      encode({ ...el, profileId } as IStrategy)
    );
    await strategiesData?.mutate();
    return result;
  };

  const update: IStrategiesContext["update"] = async (el) => {
    const { id, ...rest } = el;
    await patch(apiUrl(`/strategy/${id}`), encode(rest as IStrategy));
    await strategiesData?.mutate();
  };

  const remove: IStrategiesContext["remove"] = async (id) => {
    await _remove(apiUrl(`/strategy/${id}`));
    await strategiesData?.mutate();
  };

  const _get: IStrategiesContext["get"] = async (_id) => {
    const el = strategiesData?.data?.find(({ id }) => id === _id);
    if (el) {
      return decode(el);
    }
    const data: IStrategy = await get(apiUrl(`/strategy/${_id}`));
    return decode(data);
  };

  return (
    <StrategiesContext.Provider
      value={{
        list: (strategiesData?.data || []).map(decode),
        create,
        update,
        remove,
        get: _get,
      }}
    >
      {children}
    </StrategiesContext.Provider>
  );
}
