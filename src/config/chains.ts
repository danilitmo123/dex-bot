export enum SupportedChainsIds {
  BSC_MAINET = 56,
  BSC_TestNet = 97,
}

export default {
  [SupportedChainsIds.BSC_MAINET]: {
    name: "BSC MAINET",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    explorerUrl: "https://bscscan.com",
    mulltiCall: "0x7D92a1aB89F4c2d372E2B6b456ee6f117Ba8a28A",
    vaultsFactory: "0x47873a28E905dF802A8b92805141350F7479F80F",
  },
  [SupportedChainsIds.BSC_TestNet]: {
    name: "BSC TestNet",
    rpcUrl: "https://data-seed-prebsc-2-s2.binance.org:8545/",
    explorerUrl: "https://testnet.bscscan.com",
    mulltiCall: "",
    vaultsFactory: "",
  },
};
