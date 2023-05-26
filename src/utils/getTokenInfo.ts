import { ITokenInfo } from "dtos/ITokenInfo";
import { apiUrl, get } from "./fetcher";

const tokensInfo: { [key: string]: ITokenInfo } = {};
let loading;

export default async function getTokenInfo(
  name: string
): Promise<ITokenInfo | undefined> {
  if (!tokensInfo[name]) {
    if (!loading) {
      loading = get(apiUrl("/token/all"));
    }
    const data: ITokenInfo[] = await loading;
    if (data && data.length) {
      data.forEach((e) => {
        tokensInfo[e.address] = e;
      });
    }
  }
  return tokensInfo[name];
}
