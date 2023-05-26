import { createContext } from "react";
import IProfile from "../dtos/IProfile";

export interface ICurrentProfileContext {
  currentProfile: IProfile;
  hasRights: boolean;
}

export const CurrentProfileContext =
  createContext<ICurrentProfileContext>(null);
