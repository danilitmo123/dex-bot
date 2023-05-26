import BlackListContext from "contexts/BlackListContext";
import { useContext } from "react";

export default function useBlackList() {
  const context = useContext(BlackListContext);

  if (!context) {
    throw new Error(`Missing blackList context`);
  }

  return context;
}
