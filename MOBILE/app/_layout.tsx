import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Drawer } from "expo-router/drawer";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        }}
      >
        <Drawer.Screen
          name="(home)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color }) => (
              <TabBarIcon name="person" color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(news)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "News",
            title: "News",
            drawerIcon: ({ color }) => (
              <TabBarIcon name="newspaper" color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(courses)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Courses",
            title: "Courses",
            drawerIcon: ({ color }) => (
              <TabBarIcon name="book-outline" color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(chat)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Chat",
            title: "Chat",
            drawerIcon: ({ color }) => (
              <TabBarIcon name="chatbubble-ellipses-outline" color={color} />
            ),
          }}
        />
      </Drawer>
    </ThemeProvider>
  );
}
