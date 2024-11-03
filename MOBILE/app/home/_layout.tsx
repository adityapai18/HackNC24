import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
const _layout = () => {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
      }}
    >
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />

      <Drawer.Screen
        name="news" // This is the name of the page and must match the url from root
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
        name="chat" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Chat",
          title: "Chat",
          drawerIcon: ({ color }) => (
            <TabBarIcon name="chatbubble-ellipses-outline" color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="expense" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Expense",
          title: "Expense",
          drawerIcon: ({ color }) => (
            <TabBarIcon name="cash-outline" color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="goals" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Your Goals",
          title: "Your Goals",
          drawerIcon: ({ color }) => (
            <TabBarIcon name="flag-outline" color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default _layout;

const styles = StyleSheet.create({});
