import { tokenAtom } from "@/atom";
import { logout } from "@/lib/auth";
import { fetchAPI, useFetch } from "@/lib/fetch";
import { ConsumptionLogsType } from "@/types";
import { Link, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { ActivityIndicator, Button, Pressable, Text, View } from "react-native";

export default function Screen1() {
  const router = useRouter();
  const [token, setToken] = useAtom(tokenAtom);
  const userId = token?.split(".")[0];

  const {
    data: tea,
    loading: teaLoading,
    error: teaError,
    refetch: teaRefetch,
  } = useFetch<ConsumptionLogsType>(`/(api)/beverage/daily-beverage?userId=${userId}&beverageId=1`);

  const {
    data: coffee,
    loading: coffeeLoading,
    error: coffeeError,
    refetch: coffeeRefetch,
  } = useFetch<ConsumptionLogsType>(`/(api)/beverage/daily-beverage?userId=${userId}&beverageId=2`);

  const handleLogout = async () => {
    await logout();
    setToken(null);
    router.replace("/sign-in");
  };

  if (teaLoading || coffeeLoading) {
    return (
      <View className="h-full bg-[#1a1c1c] flex items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (teaError || coffeeError) {
    return (
      <View className="h-full bg-[#1a1c1c] flex items-center justify-center">
        <Text className="text-white">Error: {teaError} {coffeeError}</Text>
      </View>
    );
  }

  return (
    <View className="h-full bg-[#1a1c1c] flex items-center justify-center">
      <View className="flex flex-row gap-5 p-5">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <View
              key={i}
              className="flex-1 aspect-square bg-white flex items-center justify-center rounded-md"
            >
              <Text>{i + 1}</Text>
            </View>
          ))}
      </View>
      <View className="flex flex-row gap-x-5 border w-full p-5">
        <Pressable
          onPress={() => console.log("coffee")}
          className="flex-1 rounded-md bg-white p-5 aspect-square flex items-center justify-center"
        >
          <Text>Coffee {coffee?.count} </Text>
        </Pressable>
        <Pressable
          onPress={() => console.log("tea")}
          className="flex-1 rounded-md bg-white p-5 aspect-square flex items-center justify-center"
        >
          <Text>Tea {tea?.count} </Text>
        </Pressable>
      </View>
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
