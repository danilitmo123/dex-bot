import { ProfileStatus } from "./ProfileStatus";

export default interface IProfile {
  __quoteTokenId?: string;
  id: number;
  name: string;
  hash: string;
  dex: string;
  baseTokenAddr: string;
  quoteTokenAddr: string;
  mainReceiverAddr: string;
  withdrawerAddr: null | string;
  sellersCount: number;
  buyersCount: number;
  gasLimit: number;
  proxyMaxBaseBalance: string;
  proxyMaxQuoteBalance: string;
  maxPriceImpact: number;
  minTriggeringAmount: number;
  status: ProfileStatus;
  addresses: {
    seller: string[];
    buyer: string[];
  };
  vaultAddr?: string;
  createdAt?: string;
  updatedAt?: string;
}
