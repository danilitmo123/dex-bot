import { Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function FromTitle({ children }: Props) {
  return (
    <Text
      margin="0"
      lineHeight="1.15"
      fontSize={["1.0em", "1.5em", "2em", "3em"]}
      fontWeight="600"
      className="mb-3"
    >
      {children}
    </Text>
  );
}
