import { fetchAPI } from "@/lib/fetch";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, TextInput, View, Text, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {
    try {
      const response = await fetchAPI("/(api)/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      if (response.error) {
        throw new Error(response.error);
      }
      // Store token in SecureStore
      await SecureStore.setItemAsync("userToken", response.token);
      
      Alert.alert("Login successfully");
      router.push("/");
    } catch (error: any) {
      console.error("Error signing up:", error);
      Alert.alert("Error signing up:", error?.message);
    }
  };

  return (
    <View className="flex h-full items-center justify-center gap-5 p-5">
      <Text className="text-2xl font-bold underline">Sign In</Text>
      <TextInput
        placeholder="enesdmcc@gmail.com"
        className="border w-full p-3 rounded-md"
        textContentType="emailAddress"
        value={form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
      />

      <TextInput
        placeholder="ankarabulut"
        className="border w-full p-3 rounded-md"
        secureTextEntry={true}
        textContentType="password"
        value={form.password}
        onChangeText={(value) => setForm({ ...form, password: value })}
      />

      <TouchableOpacity
        className="border rounded-md p-3 w-full bg-black/50"
        onPress={onSignInPress}
      >
        <Text className="font-semibold text-lg text-center">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
