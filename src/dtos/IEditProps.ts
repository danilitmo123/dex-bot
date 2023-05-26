export interface IEditProps {
  id?: number;
  userId: number;
  name: string;
  dex: string;
  baseTokenAddr: string;
  quoteTokenAddr: string;
  mainReceiverAddr: string;
  withdrawerAddr: string;
  sellersCount: number;
  buyersCount: number;
  gasLimit: number;
  proxyMaxBaseBalance: number;
  proxyMaxQuoteBalance: number;
  maxPriceImpact: number;
  minTriggeringAmount: number;
  __vaultMode: string;
  __quoteTokenId: string;
}
