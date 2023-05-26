import EventEmitter from "eventemitter3";
import { Erc20Abi } from "../config/abi/types";

export default class TransferEventEmitter extends EventEmitter {
  static emitters: {
    [key: string]: TransferEventEmitter;
  } = {};

  static eventName(address) {
    return `BALANCE_CHANGE_${address.toUpperCase()}`;
  }

  static forceUpdateEventName = "EVENT_FORCE_UPDATE";

  static factory(token: Erc20Abi) {
    (window as any).TransferEventEmitter = TransferEventEmitter;
    if (!TransferEventEmitter.emitters[token.address]) {
      TransferEventEmitter.emitters[token.address] = new TransferEventEmitter(
        token
      );
    }
    return TransferEventEmitter.emitters[token.address];
  }
  addresses: string[] = [];

  constructor(token: Erc20Abi) {
    super();

    token.on("Transfer", (from, to) => {
      if (this.addresses.includes(from.toUpperCase())) {
        this.emit(TransferEventEmitter.eventName(from));
      } else if (this.addresses.includes(to.toUpperCase())) {
        this.emit(TransferEventEmitter.eventName(to));
      }
    });
  }

  addAddress(address: string) {
    if (!this.addresses.includes(address)) {
      this.addresses.push(address.toUpperCase());
    }
  }

  addAddresses(addresses: string[]) {
    for (const address of addresses) {
      this.addAddress(address);
    }
  }
}
