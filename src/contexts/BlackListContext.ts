import { IBlackListElement } from "dtos/IBlackListElement";
import { createContext } from "react";

export interface IBlackListContext {
  list: IBlackListElement[];
  create: (element: Omit<IBlackListElement, "id">) => void;
  update: (element: IBlackListElement) => void;
  remove: (id: number) => void;
}

const BlackListContext = createContext<IBlackListContext>({
  list: [],
  create: () => {
    // do nothing
  },
  update: () => {
    // do nothing
  },
  remove: () => {
    // do nothing
  },
});

export default BlackListContext;
