import { tokenAtom } from "@/atom";
import { Redirect, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";

const Layout = () => {
  const token = useAtomValue(tokenAtom);
  // console.log("---Auth Layout---", token);

  if (token) {
    return <Redirect href="/(tabs)/screen1" />;
  }
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
