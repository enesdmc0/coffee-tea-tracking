import React, { useCallback } from "react";
import { Redirect, Tabs } from "expo-router";
import { Image, View, Pressable, ImageSourcePropType } from "react-native";
import { images } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/atom";

interface TabIconProps {
  source: ImageSourcePropType;
  focused: boolean;
  label: string;
}

const TabIcon: React.FC<TabIconProps> = React.memo(
  ({ source, focused, label }) => (
    <Image
      source={source}
      tintColor={focused ? "white" : "#868787"}
      resizeMode="contain"
      style={{ width: 28, height: 28 }}
      accessibilityLabel={label}
    />
  )
);

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#232525",
        paddingBottom: insets.bottom,
        height: 78 + insets.bottom,
      }}
    >
      {state.routes.map((route: RouteProp<ParamListBase>, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = useCallback(() => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }, [isFocused, route.key, route.name]);

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TabIcon
              source={options.tabBarIcon({ focused: isFocused })}
              focused={isFocused}
              label={label}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const Layout: React.FC = () => {
  const token = useAtomValue(tokenAtom);
  // console.log("---Tabs Layout---", token);

  if (!token) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      initialRouteName="index"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="screen1"
        options={{
          tabBarIcon: ({ focused }) => images.tab1,
          tabBarLabel: "Ana Sayfa",
        }}
      />
      <Tabs.Screen
        name="screen2"
        options={{
          tabBarIcon: ({ focused }) => images.tab2,
          tabBarLabel: "Arama",
        }}
      />
      <Tabs.Screen
        name="screen3"
        options={{
          tabBarIcon: ({ focused }) => images.tab3,
          tabBarLabel: "Bildirimler",
        }}
      />
      <Tabs.Screen
        name="screen4"
        options={{
          tabBarIcon: ({ focused }) => images.tab4,
          tabBarLabel: "Profil",
        }}
      />
    </Tabs>
  );
};

export default Layout;
