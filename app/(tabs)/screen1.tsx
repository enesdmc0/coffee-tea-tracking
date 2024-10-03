import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Screen1() {
  return (
    <View className="h-full bg-[#1a1c1c] flex items-center justify-center">
      <Text>Screen 1</Text>
      <Link href="/sign-in">
        <Text>Sign In</Text>
      </Link>
      <Link href="/sign-up">
        <Text>Sign Up</Text>
      </Link>
    </View>
  );
}
