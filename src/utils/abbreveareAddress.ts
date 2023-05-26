export function abbreviateAddress(base58: string, size = 4) {
  return base58 ? base58.slice(0, size) + "…" + base58.slice(-size) : "";
}
