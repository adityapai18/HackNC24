import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Formik } from "formik";
import { useAppContext } from "@/lib/context";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";

const Signup = ({ navigation }: any) => {
  const auth = useAppContext();
  const router = useRouter();
  return (
    <ThemedView style={styles.background_main}>
      <>
        <Formik
          initialValues={{
            id: "",
            pass: "",
            cpass: "",
          }}
          onSubmit={(values) => {
            if (values.cpass === values.pass) {
              auth?.putIdPass(values.id, values.pass);
            }
            // auth?.signIn(values.id, values.pass);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <ThemedView style={{ marginTop: 35 }}>
              <ThemedView style={[styles.container]}>
                <ThemedView style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Enter username"}
                    value={values.id}
                    autoCapitalize="none"
                    onChangeText={handleChange("id")}
                    placeholderTextColor={"grey"}
                  />
                </ThemedView>
              </ThemedView>
              <ThemedView style={[styles.container]}>
                <ThemedView style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Enter Password"}
                    value={values.pass}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={handleChange("pass")}
                    placeholderTextColor={"grey"}
                  />
                </ThemedView>
              </ThemedView>
              <ThemedView style={[styles.container]}>
                <ThemedView style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Confirm Password"}
                    value={values.cpass}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={handleChange("cpass")}
                    placeholderTextColor={"grey"}
                  />
                </ThemedView>
              </ThemedView>
              <ThemedText
                style={{
                  color: "white",
                  textAlign: "center",
                  marginBottom: 25,
                  fontSize: 14,
                }}
              >
                Already have an Account ?
                <ThemedText
                  style={{ color: "cyan" }}
                  onPress={() => {
                    router.push("/auth/login");
                  }}
                >
                  {"  "}Log In
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
                    Sign Up
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

export default Signup;

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
