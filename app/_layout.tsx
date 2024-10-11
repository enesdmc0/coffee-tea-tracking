import AuthProvider from "@/provider/auth-provider";
import { Stack } from "expo-router";
import { Provider } from "jotai";

export default function RootLayout() {
  return (
    <Provider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}
