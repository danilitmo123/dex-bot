/// <reference types="react-scripts" />
interface Window {
    ethereum?: {
      isMetaMask?: true
      isTrust?: true
      providers?: any[]
      request?: (...args: any[]) => Promise<void>
    }
  }