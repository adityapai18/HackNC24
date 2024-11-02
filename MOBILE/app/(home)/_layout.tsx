import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const HomeScreen = () => {
  return (
    <ParallaxScrollView>
      <ThemedText>Home Screen</ThemedText>
    </ParallaxScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
