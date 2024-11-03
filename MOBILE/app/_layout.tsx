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
import NavigationIni from "./lib/nav";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ContextProvider } from "./lib/context";

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
      <ContextProvider>
        <NavigationIni colorScheme={colorScheme === "dark" ? 'dark' : 'light'}></NavigationIni>
      </ContextProvider>
    </ThemeProvider>
  );
}
