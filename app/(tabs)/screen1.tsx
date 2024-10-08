import { tokenAtom } from "@/atom";
import { logout } from "@/lib/auth";
import { Link, useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { Button, Text, View } from "react-native";

export default function Screen1() {
  const router = useRouter();
  const token = useAtomValue(tokenAtom);
  const handleLogout = async () => {
    await logout();
    console.log("token", token);
    router.replace("/sign-in");
  };
  return (
    <View className="h-full bg-[#1a1c1c] flex items-center justify-center">
      <Text>Screen 1</Text>
      <Link href="/sign-in">
        <Text>Sign In</Text>
      </Link>
      <Link href="/sign-up">
        <Text>Sign Up</Text>
      </Link>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}
