import React from "react";
import { Provider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import store from "./state";
import { getLibrary } from "./utils/web3React";
import { ChakraProvider } from "@chakra-ui/react";

const Providers: React.FC = ({ children }) => {
  return (
    <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <>{children}</>
        </Provider>
      </Web3ReactProvider>
    </ChakraProvider>
  );
};

export default Providers;
