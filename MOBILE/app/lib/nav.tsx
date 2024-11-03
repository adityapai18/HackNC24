import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppContext } from "./context";
import AuthStack from "./stacks/AuthStack";
import AppStack from "./stacks/AppStack";
import KycStack from "./stacks/KycStack";
const NavigationBar = ({ colorScheme }: { colorScheme: string }) => {
  const auth = useAppContext();
  return auth?.user ? (
    <>
      {/* {auth.user.isAuth == undefined && <AuthStack></AuthStack>} */}
      {auth.user.verificationStatus == "pass" || auth.user.verificationStatus == null  && (
        <AppStack colorScheme={colorScheme} />
      )}
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
