import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/Signup";


const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="(login)" component={Login} />
      <Stack.Screen name="(signup)" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});