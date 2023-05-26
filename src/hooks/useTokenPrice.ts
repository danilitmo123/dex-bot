import { Erc20Abi } from "../config/abi/types";
import { useEffect, useState } from "react";
import { BigFloat } from "bigfloat.js";
import { BigNumber } from "ethers";

const tokensDecimals: {
  [token: string]: number;
} = {};

export default function useTokenPrice(
  token?: Erc20Abi,
  sum?: string,
  address?: string
) {
  const [decimals, setDecimals] = useState(tokensDecimals[token?.address]);
  const [balance, setBalance] = useState<BigNumber>();

  const loadBalance = async () => {
    const data = await token.balanceOf(address);
    setBalance(data);
  };

  const loadDecimals = async () => {
    const decimals = await token.decimals();
    if (!sum && address) {
      await loadBalance();
    }
    tokensDecimals[token.address] = decimals;
    setDecimals(decimals);
  };

  useEffect(() => {
    if (token?.address && !tokensDecimals[token.address]) {
      loadDecimals();
    }
  }, []);

  const update = () => {
    if (!tokensDecimals[token.address]) {
      loadDecimals();
    } else {
      loadBalance();
    }
  };

  if (!decimals) {
    return {
      value: 0,
      update,
    };
  }

  const floatValue = new BigFloat(sum ? sum : balance.toString());
  const floatDecimals = BigNumber.from(10).pow(decimals);
  return {
    value: floatValue.div(floatDecimals.toString()).toString(),
    update,
  };
}
