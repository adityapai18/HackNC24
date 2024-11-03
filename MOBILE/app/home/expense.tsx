import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useAppContext } from "@/lib/context";
import { base_url } from "@/constants/Urls";

const Expense = () => {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [expenseType, setExpenseType] = useState("expense"); // Default to "expense"
  const [transactions, setTransactions] = useState([]); // State to hold fetched transactions

  const auth = useAppContext();

  // Fetch transactions function
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${base_url}/user/all-trans`, {
        params: { userId: auth?.user?.id },
      });
      console.log(response.data)
      if (response.data.success) {
        setTransactions(response.data.transactions);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Alert.alert("Error", "An error occurred while fetching transactions.");
    }
  };

  // Fetch transactions on component mount and after a new transaction is added
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async () => {
    if (!amount || !expenseType) {
      Alert.alert("Error", "Amount and Expense Type are required fields.");
      return;
    }

    console.log(auth?.user?.id)
    const newTransaction = {
      userId: auth?.user?.id,
      amount: parseInt(amount, 10),
      purpose,
      expenseType,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        `${base_url}/user/add-expense`,
        newTransaction
      );
      if (response.data.success) {
        Alert.alert("Success", "Transaction added successfully!");
        setAmount("");
        setPurpose("");
        setExpenseType("expense");
        fetchTransactions(); // Fetch transactions again to update the list
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while adding the transaction.");
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Add Expense / Income</ThemedText>

      <ThemedText style={styles.label}>Amount</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <ThemedText style={styles.label}>Purpose</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Purpose"
        value={purpose}
        onChangeText={setPurpose}
      />

      <ThemedText style={styles.label}>Expense Type</ThemedText>
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            expenseType === "expense" && styles.selectedTypeButton,
          ]}
          onPress={() => setExpenseType("expense")}
        >
          <ThemedText
            style={[expenseType === "expense" && styles.selectedTypeText]}
          >
            Expense
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            expenseType === "income" && styles.selectedTypeButton,
          ]}
          onPress={() => setExpenseType("income")}
        >
          <ThemedText
            style={[expenseType === "income" && styles.selectedTypeText]}
          >
            Income
          </ThemedText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity  onPress={handleSubmit} style={styles.submitButton}><ThemedText style = {styles.submitButtonText}>Submit</ThemedText></TouchableOpacity>

      {/* Display list of transactions */}
      <ThemedText style={styles.transactionTitle}>Your Transactions</ThemedText>
        <FlatList
        data={transactions}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.transactionItem}>
            <View >
                <Text style={styles.transactionPurpose}>{item.purpose}</Text>
                <Text style={styles.transactionDate}>
                {new Date(item.timestamp).toLocaleDateString()}
                </Text>
            </View>
            <Text
                style={[
                styles.transactionAmount,
                item.expenseType === "income" ? styles.incomeAmount : styles.expenseAmount,
                ]}
            >
                {item.expenseType === "income" ? "+" : "-"} ${item.amount}
            </Text>
            </View>
        )}
        ListEmptyComponent={
            <Text style={styles.noTransactions}>No transactions found.</Text>
        }
        />

    </ThemedView>
  );
};

export default Expense;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 15,
      borderRadius: 15, // Border radius for text input
    },
    typeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    typeButton: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 15, // Border radius for type buttons
      height: 45, // Fixed height for all buttons
      marginHorizontal: 5,
    },
    selectedTypeButton: {
      backgroundColor: "#007AFF",
      borderColor: "#007AFF",
    },
    selectedTypeText: {
      color: "#fff",
    },
    transactionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 10,
    },
    transactionItem: {
      padding: 15,
      backgroundColor: "#f9f9f9",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      flexDirection: "row", // Layout direction for transaction item
      justifyContent: "space-between", // Space between items
      alignItems: "center", // Center items vertically
    },
    transactionPurpose: {
      fontSize: 14,
      color: "#555",
      flex: 1, // Allow purpose to take available space
    },
    transactionDate: {
      fontSize: 12,
      color: "#888",
      marginBottom: 5, // Margin for spacing above amount
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "right", // Align amount to the right
    },
    noTransactions: {
      textAlign: "center",
      color: "#888",
      marginVertical: 20,
    },
    submitButton: {
      borderRadius: 15, // Border radius for rounded corners
      height: 45, // Fixed height for uniformity
      backgroundColor: "#007AFF", // Background color for the button
      justifyContent: "center", // Center the content vertically
      alignItems: "center", // Center the content horizontally
      paddingHorizontal: 20, // Horizontal padding
    },
    submitButtonText: {
      color: "#ffffff", // Set text color to white
      fontSize: 16, // Text size
      fontWeight: "bold", // Text weight
    },
    incomeAmount: {
      color: "green", // Green for income
    },
    expenseAmount: {
      color: "red", // Red for expense
    },
  });
  