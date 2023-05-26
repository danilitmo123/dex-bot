import { IEditProps } from "dtos/IEditProps";
import IProfile from "dtos/IProfile";
import { createContext } from "react";

export interface IProfilesContext {
  profiles: IProfile[];
  load: () => void;
  addProfile: (data: IEditProps) => Promise<any>;
  updateProfile: (data: IEditProps) => Promise<any>;
  deleteProfile: (id: number) => Promise<any>;
  controlProfile: (id: number, value: "start" | "stop") => Promise<IProfile>;
}

export const ProfilesContext = createContext<IProfilesContext>(null);
