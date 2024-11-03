import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAppContext } from "./context";
import { useRouter } from "expo-router";

const NavigationBar = ({ colorScheme }: { colorScheme: string }) => {
  const auth = useAppContext();
  const navigation = useRouter();
  useEffect(() => {
    if (auth?.user) {
      if (auth.user.verificationStatus == "pass") {
        navigation.push("(home)"); // Navigates to the (home) route group
      }
    }
    // navigation.navigate("")
  }, [auth?.user]);
  return auth?.user ? (
    <>
      {/* {auth.user.isAuth == undefined && <AuthStack></AuthStack>} */}
      {auth.user.verificationStatus == "pass" ||
        (auth.user.verificationStatus == null && (
          <AppStack colorScheme={colorScheme} />
        ))}
      {auth.user.verificationStatus == "waiting" && <></>}
      {/* {auth.user.verificationStatus == null && <KycStack />} */}
      {/* {auth.user.isAuth != undefined ? (
        auth.user.isAuth == true ? (
          <UserStack />
        ) : (
          <Waiting />
        )
      ) : (
        <AuthStack></AuthStack>
      )} */}
    </>
  ) : (
    <AuthStack />
  );
};

export default NavigationBar;

const styles = StyleSheet.create({});
