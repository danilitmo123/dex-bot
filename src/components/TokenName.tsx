import React, { useEffect, useState } from "react";
import getTokenInfo from "../utils/getTokenInfo";
import { abbreviateAddress } from "../utils/abbreveareAddress";

type TokenNameProps = {
  address: string;
  replacer?: string;
};

const TokenName: React.FC<TokenNameProps> = ({ address, replacer }) => {
  const [name, setname] = useState<string>();

  const _loadTokenName = async () => {
    const info = await getTokenInfo(address);
    if (info?.symbol) {
      setname(info?.symbol);
    }
  };

  useEffect(() => {
    _loadTokenName();
  }, []);

  return (
    <>
      {name
        ? name.toUpperCase()
        : replacer
        ? replacer
        : abbreviateAddress(address)}
    </>
  );
};

export default TokenName;
