import { IStrategy } from "dtos/IStrategy";
import { createContext } from "react";

export interface IStrategiesContext {
  list: IStrategy[];
  create: (element: Omit<IStrategy, "id">) => any;
  update: (element: IStrategy) => any;
  remove: (id: number) => any;
  get: (id: number) => Promise<IStrategy | undefined>;
}

const StrategiesContext = createContext<IStrategiesContext>({
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
  get: () => {
    // do nothing
    return undefined;
  },
});

export default StrategiesContext;
