import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";
import { router } from "expo-router";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        // await fetchAPI("/(api)/user", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         name: form.name,
        //         email: form.email,
        //         clerkId: completeSignUp.createdUserId,
        //     }),
        // });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
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

      <ReactNativeModal
        isVisible={verification.state === "pending"}
        // onBackdropPress={() =>
        //   setVerification({ ...verification, state: "default" })
        // }
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className=" min-h-[300px]">
          <Text>{form.email}</Text>
          <TextInput
            placeholder={"12345"}
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code) => setVerification({ ...verification, code })}
          />
          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}
          <Button title="Verify Email" onPress={onPressVerify} />
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="min-h-[300px]">
          <Text>You have successfully verified your account.</Text>
          <Button
            title="Browse Home"
            onPress={() => {
              setShowSuccessModal(false);
              router.push(`/(tabs)/screen1`);
            }}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};
export default SignUp;
