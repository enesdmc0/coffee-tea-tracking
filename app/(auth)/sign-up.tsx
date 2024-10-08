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
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
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
    <SafeAreaView className="bg-black flex-1">
      <View className=" h-full  p-5 flex gap-y-5 pt-20">
        <Text className="text-3xl text-white font-bold ">Kayıt Ol</Text>

        <View className="flex gap-y-3">
        <Text className="text-white text-lg">Ad</Text>
          <TextInput
            className="border border-[#868787] w-full p-3 text-white rounded-md placeholder:text-white"
            placeholder="enes"
             placeholderTextColor="#868787"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
        </View>

        <View className="flex gap-y-3">
        <Text className="text-white text-lg">Soyad</Text>
          <TextInput
            className="border border-[#868787] w-full p-3 text-white rounded-md placeholder:text-white"
            placeholder="demirci"
             placeholderTextColor="#868787"
            value={form.surname}
            onChangeText={(value) => setForm({ ...form, surname: value })}
          />
        </View>
        <View className="flex gap-y-3">
        <Text className="text-white text-lg">Email</Text>
          <TextInput
            className="border border-[#868787] w-full p-3 text-white rounded-md placeholder:text-white"
            placeholder="test@example.org"
             placeholderTextColor="#868787"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            autoCapitalize="none"
          />
        </View>
        <View className="flex gap-y-3">
        <Text className="text-white text-lg">Şifre</Text>
          <TextInput
             className="border border-[#868787] w-full p-3 text-white rounded-md placeholder:text-white"
            placeholder="*****"
             placeholderTextColor="#868787"
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            autoCapitalize="none"
          />
        </View>

        <View>
          <TouchableOpacity
            className="border rounded-md p-2 w-full bg-white text-black"
            onPress={onSignUpPress}
          >
            <Text className="font-semibold text-lg text-center">Kayıt Ol</Text>
          </TouchableOpacity>
          <Text className="text-[#868787] text-center mt-5">
            Hesabınız var mı?{" "}
            <Link className="text-white" href="/sign-in">
              Giriş Yap
            </Link>
          </Text>
        </View>


       
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};
export default SignUp;
