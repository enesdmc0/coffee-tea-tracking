import { useState } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchAPI } from "@/lib/fetch";
import { router } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    try {
      const response = await fetchAPI("/(api)/user/create", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          surname: form.surname,
          email: form.email,
          password: form.password,
        }),
      });
      if (response.error) {
        throw new Error(response.error);
      }

      Alert.alert("User created successfully");
      router.push("/(auth)/sign-in");
    } catch (error: any) {
      console.error("Error signing up:", error);
      Alert.alert("Error signing up:", error?.message);
    }
  };

  return (
    <View className="flex items-center justify-center h-full">
      <View className="flex gap-5 p-5 w-full ">
        <TextInput
          className="border w-full p-3 rounded-md"
          placeholder="name"
          value={form.name}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
        <TextInput
          className="border w-full p-3 rounded-md"
          placeholder="surname"
          value={form.surname}
          onChangeText={(value) => setForm({ ...form, surname: value })}
        />
        <TextInput
          className="border w-full p-3 rounded-md"
          placeholder="email"
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <TextInput
          className="border w-full p-3 rounded-md"
          placeholder="password"
          secureTextEntry={true}
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />

        <TouchableOpacity
          onPress={onSignUpPress}
          className="border rounded-md p-3 w-full bg-black/50"
        >
          <Text className="font-semibold text-lg text-center">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SignUp;
