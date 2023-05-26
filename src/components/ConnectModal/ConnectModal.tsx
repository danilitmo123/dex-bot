import React from "react";
import { ConnectorNames } from "../../config/constants/wallets";
import useAuth from "../../hooks/useAuth";
import { connectorLocalStorageKey } from "config/constants/wallets";
import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import baseName from "../../utils/base";

const ConnectModal = ({ isOpen, closeModal }) => {
  const setProvider = (type: string) => {
    window.localStorage.setItem(connectorLocalStorageKey, type);
  };

  const { login } = useAuth();

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: "none",
          }}
        />
        <ModalBody paddingBottom="1.5rem">
          <VStack>
            <Button
              variant="outline"
              onClick={() => {
                login(ConnectorNames.CoinbaseWallet);
                setProvider(ConnectorNames.CoinbaseWallet);
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <img
                  src={`/${baseName}/cbw.png`}
                  alt="Coinbase Wallet Logo"
                  width={25}
                  height={25}
                  border-radius="3px"
                />
                <Text>Coinbase Wallet</Text>
              </HStack>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                login(ConnectorNames.WalletConnect);
                setProvider(ConnectorNames.WalletConnect);
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <img
                  src={`/${baseName}/wc.png`}
                  alt="Wallet Connect Logo"
                  width={26}
                  height={26}
                  border-radius="3px"
                />
                <Text>Wallet Connect</Text>
              </HStack>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                login(ConnectorNames.Injected);
                setProvider(ConnectorNames.Injected);
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <img
                  src={`/${baseName}/mm.png`}
                  alt="Metamask Logo"
                  width={25}
                  height={25}
                  border-radius="3px"
                />
                <Text>Metamask</Text>
              </HStack>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConnectModal;
