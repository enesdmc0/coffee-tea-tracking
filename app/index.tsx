import { tokenAtom } from "@/atom";
import { Redirect } from "expo-router";
import { useAtomValue } from "jotai";

const Page = () => {
  const token = useAtomValue(tokenAtom);
  console.log("token hoome", token);
  if (token) return <Redirect href="/(tabs)/screen1" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
