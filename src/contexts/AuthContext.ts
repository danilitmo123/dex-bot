import { createContext } from "react";

export interface IAuthContext {
  initialized: boolean;
  authorized: boolean;
  userId?: number;
  login: string;
  setLogin: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  authToken?: string;
  auth: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  initialized: false,
  authorized: false,
  login: "",
  password: "",
  setLogin: () => {
    // do nothing
  },
  setPassword: () => {
    // do nothing
  },
  auth: () => {
    // do nothing
  },
});
