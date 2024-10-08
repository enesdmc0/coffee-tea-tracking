import { tokenAtom } from "@/atom";
import { Redirect } from "expo-router";
import { useAtomValue } from "jotai";

const Page = () => {
  const token = useAtomValue(tokenAtom);
  console.log("----Home Page-----", token);

  if (token) {
    return <Redirect href="/screen1" />;
  }

  return <Redirect href="/welcome" />;
};

export default Page;
