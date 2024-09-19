import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="screen1" options={{ headerShown: false }} />
      <Stack.Screen name="screen2" options={{ headerShown: false }} />
      <Stack.Screen name="screen3" options={{ headerShown: false }} />
      <Stack.Screen name="screen4" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
