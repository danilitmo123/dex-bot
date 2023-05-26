import { AuthContext } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { apiUrl, post } from "utils/fetcher";
import { useToast } from "@chakra-ui/react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  id: number;
  name: string;
}

const DEMO_USER_AUTH_LOCALSTORAGE_KEY = "DEMO_USER_AUTH_LOCALSTORAGE_KEY";

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toastSuccess = useToast({ status: "success", position: "top" });
  const toastError = useToast({ status: "error", position: "top" });
  const [userId, setUserId] = useState<number>();

  const setUser = (user: User) => {
    (window as any).localStorage.setItem(
      DEMO_USER_AUTH_LOCALSTORAGE_KEY,
      JSON.stringify({
        user,
      })
    );
    setAuthorized(true);
    setUserId(user.id);
    toastSuccess({ description: "Authorized" });
  };

  const checkAuth = () => {
    setTimeout(() => {
      const _data = (window as any).localStorage.getItem(
        DEMO_USER_AUTH_LOCALSTORAGE_KEY
      );
      const data = JSON.parse(_data || "{}");
      if (data.user && data.user.id) {
        setAuthorized(true);
        setUserId(+data.user.id);
      }
      setInitialized(true);
    }, 500);
  };

  const auth = async () => {
    // setAuthorized(true);
    const data = await post(apiUrl("/auth"), { name: login, password });
    const { error, message, id, name } = data;
    if (error || !id) {
      toastError({ description: message || error || "Authorization error" });
      return;
    }
    setUser({ id, name });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        initialized,
        authorized,
        login,
        password,
        setLogin,
        setPassword,
        auth,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
