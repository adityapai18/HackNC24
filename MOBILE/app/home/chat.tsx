import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons"; // For the arrow icon
import axios from "axios";
import { base_url } from "@/constants/Urls";
import { useAppContext } from "@/lib/context";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey! How can I assist you?", sender: "bot" },
  ]);
  const auth = useAppContext();
  const [currMessage, setCurrMessage] = useState("");

  const renderMessageItem = ({ item }: any) => (
    <ThemedView
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userBubble : styles.botBubble,
      ]}
    >
      <ThemedText style={styles.messageText}>{item.text}</ThemedText>
    </ThemedView>
  );

  const sendMessage = async () => {
    if (!currMessage.trim()) {
      alert("Please enter a message");
      return;
    }

    // Append user's message to the chat
    const userMessage = {
      id: Date.now().toString(),
      text: currMessage,
      sender: "user",
    };
    setMessages((prevMessages) => [userMessage, ...prevMessages]);

    try {
      // Send the message to the chatbot API
      console.log({
        userId: auth?.user?.id,
        input: currMessage,
      })
      const response = await axios.post(`${base_url}/chat/send-message`, {
        userId: auth?.user?.id,
        input: currMessage,
      });

      // Bot's response from the API
      const botMessageText =
        response.data.message || "Sorry, I couldn't respond at the moment.";

      // Append bot's message to the chat
      const botMessage = {
        id: Date.now().toString() + "_bot",
        text: botMessageText,
        sender: "bot",
      };
      setMessages((prevMessages) => [botMessage, ...prevMessages]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setCurrMessage(""); // Clear the input field
    }
  };

  return (
    <ThemedView style={styles.container}>
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
          onChangeText={setCurrMessage}
          value={currMessage}
          style={styles.input}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
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
    color:'black'
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
