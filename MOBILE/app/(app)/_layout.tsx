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
import { useRouter } from "expo-router";
const Login = ({ navigation }: any) => {
  const auth = useAppContext();
  const router = useRouter()
  useEffect(() => {
    if (auth?.user) {
      router.push("/home");
    }
  }, [auth?.user]);
  return (
    <ThemedView style={styles.background_main}>
      <>
        <Formik
          initialValues={{
            id: "",
            pass: "",
          }}
          onSubmit={async (values) => {
            const res = await auth?.login(values.id, values.pass);
            if(res && res.id){
                router.push('/home')
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <ThemedView style={{ marginTop: 35 }}>
              <ThemedView style={[styles.container]}>
                <ThemedView style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Your ID"}
                    value={values.id}
                    onChangeText={handleChange("id")}
                    placeholderTextColor={"grey"}
                  />
                </ThemedView>
              </ThemedView>
              <ThemedView style={[styles.container]}>
                <ThemedView style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Your Password"}
                    value={values.pass}
                    secureTextEntry
                    onChangeText={handleChange("pass")}
                    placeholderTextColor={"grey"}
                  />
                </ThemedView>
              </ThemedView>
              <ThemedText
                style={{
                  marginBottom: 25,
                  fontSize: 14,
                }}
              >
                Dont Have an Account ?
                <ThemedText
                  style={{ color: "cyan" }}
                  onPress={() => {
                    router.push("/auth/signup");
                  }}
                >
                  {"  "}Sign Up
                </ThemedText>
              </ThemedText>
              <ThemedView style={[styles.container]}>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={{
                    backgroundColor: "#4896f0",
                    height: 48,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                  }}
                >
                  <ThemedText
                    style={{
                      color: "#fefefe",
                      fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    Login
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          )}
        </Formik>
      </>
    </ThemedView>
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
