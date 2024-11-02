import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const ChatScreen = () => {
  return (
    <ParallaxScrollView>
      <ThemedText>Chat Screen</ThemedText>
    </ParallaxScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
