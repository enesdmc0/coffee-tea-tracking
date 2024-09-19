import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, TextInput, View, Text, TouchableOpacity } from "react-native";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/screen1");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

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
