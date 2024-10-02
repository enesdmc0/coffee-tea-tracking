import React, { FC, useEffect } from "react";
import { useAtom } from "jotai";
import { fetchTokenAtom } from "@/atom";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [, fetchToken] = useAtom(fetchTokenAtom);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return <>{children}</>;
};

export default AuthProvider;
