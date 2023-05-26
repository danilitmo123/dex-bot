import { useContext } from "react";
import { CurrentProfileContext } from "../contexts/CurrentProfileContext";

export default function useCurrentProfile() {
  const context = useContext(CurrentProfileContext);

  if (!context) {
    throw new Error(`Missing current profile context`);
  }

  return context;
}
