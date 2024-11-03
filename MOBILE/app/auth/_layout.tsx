import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Formik } from "formik";
import { useAppContext } from "@/lib/context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import axios from "axios";
import { base_url } from "@/constants/Urls";
import { Stack, useRouter } from "expo-router";
const Login = ({ navigation }: any) => {
  const auth = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (auth?.user) {
      router.push("/home");
    }
  }, [auth?.user]);
  return (
    <Stack>
        <Stack.Screen name="login"/>
        <Stack.Screen name="signup"/>
    </Stack>
    // </Theme÷dView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  searchBar: {
    paddingHorizontal: 8,
    flexDirection: "row",
    width: "99%",
    borderWidth: 1,
    borderColor: "#aea0ae",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 8,
  },
  input: {
    fontSize: 16,
    marginLeft: 8,
    width: "100%",
    color: "#fefefe",
  },
  background_main: {
    flex: 1,
    paddingBottom: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
