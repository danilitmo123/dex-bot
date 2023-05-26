import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import useStrategies from "hooks/useStrategies";
import StrategyForm, { StrategiesProps } from "./StrategyForm";
import { useHistory, useParams } from "react-router-dom";
import { IStrategy } from "../../dtos/IStrategy";
import { useToast } from "@chakra-ui/react";

const StrategyEdit = () => {
  const history = useHistory();
  const { strategy, id } = useParams<{ strategy: string; id: string }>();
  const { update, get } = useStrategies();
  const [strategyData, setStrategyData] = useState<IStrategy>();
  const toastError = useToast({ status: "error", position: "top" });

  const onSubmit: SubmitHandler<StrategiesProps> = async (data) => {
    const result = await update({
      ...data,
      id: +strategy,
      type: data.type,
      minBalance: +data.minBalance,
      minBaseAssetPrice: +data.minBaseAssetPrice,
      maxBaseAssetPrice: +data.maxBaseAssetPrice,
      fill: +data.fill,
    });

    return result;
  };

  const load = async () => {
    try {
      const data = await get(+strategy);
      if (data) {
        setStrategyData({
          ...data,
        });
        return;
      }
    } catch (e: any) {
      toastError({ description: e?.message || "Error" });
    }
    toastError({ description: "Can not find strategy" });
    history.push(`/profile/${id}`);
  };

  useEffect(() => {
    if (strategy) {
      load();
    } else {
      setStrategyData(undefined);
    }
  }, [strategy]);

  return (
    <>
      {strategyData && (
        <StrategyForm
          title="Edit strategy"
          onSubmit={onSubmit}
          defaultValues={strategyData}
        />
      )}
    </>
  );
};

export default StrategyEdit;
