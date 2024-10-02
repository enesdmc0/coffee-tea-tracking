import { View, Text } from "react-native";
import React from "react";
import {Link} from "expo-router";

const Welcome = () => {
  return (
    <View className="h-full flex items-center justify-center gap-5 bg-red-400">
      <Text className="text-xl font-bold underline">Welcome Page</Text>
        <Link className="border p-5 rounded text-center  bg-black text-white w-40" href="/sign-up">Sign Up</Link>
        <Link className="border p-5 rounded text-center  bg-black text-white w-40" href="/sign-in">Sign in</Link>
    </View>
  );
};

export default Welcome;
