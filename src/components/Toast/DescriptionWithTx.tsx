import { Link, Text } from "@chakra-ui/react";
import { getBscScanLink } from "utils/providers";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import truncateHash from "utils/truncateHash";

interface DescriptionWithTxProps {
  description?: string;
  txHash?: string;
}

const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({
  txHash,
  children,
}) => {
  const { chainId } = useActiveWeb3React();

  return (
    <>
      {typeof children === "string" ? <Text as="p">{children}</Text> : children}
      {txHash && (
        <Link isExternal href={getBscScanLink(txHash, "transaction", chainId)}>
          {"View on BscScan"}: {truncateHash(txHash, 8, 0)}
        </Link>
      )}
    </>
  );
};

export default DescriptionWithTx;
