import { fetchAPI } from "@/lib/fetch";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, TextInput, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { tokenAtom } from "@/atom";
import { saveToken } from "@/lib/auth";
const SignIn = () => {
  const [isToken, setIsToken] = useAtom(tokenAtom);
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
      await saveToken(response.token);
      setIsToken(response.token);
      Alert.alert("Login successfully");
      router.replace("/");
    } catch (error: any) {
      console.error("Error signing up:", error);
      Alert.alert("Error signing up:", error?.message);
    }
  };

  return (
    <SafeAreaView className="bg-black flex-1">
      <View className=" h-full  p-5 flex gap-y-5 pt-20">
        <Text className="text-3xl text-white font-bold "> Giriş Yap </Text>

        <View className="flex gap-y-3">
          <Text className="text-white text-lg">Email</Text>
          <TextInput
            placeholder="test@example.org"
            placeholderTextColor="#868787"
            className="border border-[#868787] w-full p-3 text-white rounded-md placeholder:text-white"
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            autoCapitalize="none"
          />
        </View>

        <View className="flex gap-y-3">
          <Text className="text-white text-lg">Şifre</Text>
          <TextInput
            placeholder="*****"
            placeholderTextColor="#868787"
            className="border border-[#868787] w-full p-3 text-white rounded-md"
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            autoCapitalize="none"
          />
        </View>

        <View>
          <TouchableOpacity
            className="border rounded-md p-2 w-full bg-white text-black"
            onPress={onSignInPress}
          >
            <Text className="font-semibold text-lg text-center">Giriş Yap</Text>
          </TouchableOpacity>
          <Text className="text-[#868787] text-center mt-5">
            Hesabınız yok mu?{" "}
            <Link className="text-white" href="/sign-up">
              Kayıt Ol
            </Link>
          </Text>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default SignIn;
