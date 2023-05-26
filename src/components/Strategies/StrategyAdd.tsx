import React from "react";
import { SubmitHandler } from "react-hook-form";
import useStrategies from "hooks/useStrategies";
import StrategyForm, { StrategiesProps } from "./StrategyForm";

const defaultStrategies = {
  type: "buy",
  minBaseAssetPrice: 0,
  maxBaseAssetPrice: 10,
  fill: 50,
  minBalance: 0.5,
};

const StrategyAdd = () => {
  const { create } = useStrategies();

  const onSubmit: SubmitHandler<StrategiesProps> = async (data) => {
    const result = await create({
      ...data,
      type: data.type,
      minBalance: +data.minBalance,
      minBaseAssetPrice: +data.minBaseAssetPrice,
      maxBaseAssetPrice: +data.maxBaseAssetPrice,
      fill: +data.fill,
    });

    return result;
  };

  return (
    <StrategyForm
      title="Add strategy"
      onSubmit={onSubmit}
      defaultValues={defaultStrategies}
    />
  );
};

export default StrategyAdd;
