import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";

export default function useBackendAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`Missing backend auth context`);
  }

  return context;
}
