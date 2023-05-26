import StrategiesContext from "contexts/StrategiesContext";
import { useContext } from "react";

export default function useStrategies() {
  const context = useContext(StrategiesContext);

  if (!context) {
    throw new Error(`Missing strategies context`);
  }

  return context;
}
