import React, { useEffect } from "react";
import useEagerConnect from "./hooks/useEagerConnect";
import AuthProvider from "providers/AuthProvider";
import CopyToast from "components/CopyToast";
import AppRoutes from "./routes";

const App: React.FC = () => {
  useEffect(() => {
    console.warn = () => null;
  }, []);

  useEagerConnect();

  return (
    <AuthProvider>
      <AppRoutes />
      <CopyToast />
    </AuthProvider>
  );
};

export default React.memo(App);
