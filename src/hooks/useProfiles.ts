import { ProfilesContext } from "contexts/ProfilesContext";
import { useContext } from "react";

export default function useProfiles() {
  const context = useContext(ProfilesContext);

  if (!context) {
    throw new Error(`Missing profiles context`);
  }

  return context;
}
