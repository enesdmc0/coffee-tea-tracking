import React, { FC, useEffect } from "react";
import { useAtom } from "jotai";
import * as SecureStore from "expo-secure-store";
import { tokenAtom } from "@/atom";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [isToken, setIsToken] = useAtom(tokenAtom);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      setIsToken(token);
    };

    fetchToken();

  }, []);

  return <>{children}</>;
};

export default AuthProvider;
