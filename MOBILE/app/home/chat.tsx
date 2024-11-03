import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons"; // For the arrow icon

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey! How can I assist you?", sender: "bot" },
  ]);

  const renderMessageItem = ({ item }:any) => (
    <ThemedView style={[styles.messageBubble, item.sender === "user" ? styles.userBubble : styles.botBubble]}>
      <ThemedText style={styles.messageText}>{item.text}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerText}>Finance Advisor</ThemedText>
      </ThemedView>

      {/* Chat Messages Area */}
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatArea}
        inverted // Makes the list scroll from the bottom
      />

      {/* Input Area */}
      <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#038aff",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  chatArea: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F0F0",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  sendButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#038aff",
    borderRadius: 20,
  },
});
