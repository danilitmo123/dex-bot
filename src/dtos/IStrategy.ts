export interface IStrategy {
  id: number;
  type: "buy" | "sell";
  minBaseAssetPrice: number;
  maxBaseAssetPrice: number;
  fill: number;
  profileId: number;
  minBalance: number;
}
