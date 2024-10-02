import { Redirect } from "expo-router";

const Page = () => {
  const isSignedIn = false;
  if (isSignedIn) return <Redirect href="/(tabs)/screen1" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
