import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useAppContext } from "@/lib/context";
import { base_url } from "@/constants/Urls";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Goals = () => {
  const [amount, setAmount] = useState("");
  const [goalDeadline, setGoalDeadline] = useState(new Date()); // Default to current date
  const [showDatePicker, setShowDatePicker] = useState(false); // For toggling date picker
  const [longGoal, setLongGoal] = useState(false);
  const [goals, setGoals] = useState([]); // State to hold fetched goals

  const auth = useAppContext();

  // Fetch goals function
  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${base_url}/user/all-goals`, {
        params: { userId: auth?.user?.id },
      });
      if (response.data.success) {
        setGoals(response.data.goals);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
      Alert.alert("Error", "An error occurred while fetching goals.");
    }
  };

  // Fetch goals on component mount
  useEffect(() => {
    fetchGoals();
  }, []);

  // Prepare data for bar chart
  const goalAmounts = goals.map((goal:any) => goal.amount);
  const goalLabels = goals.map((goal:any) => goal.goalType === "long_term" ? "Long" : "Short");

  const chartData = {
    labels: goalLabels,
    datasets: [
      {
        data: goalAmounts,
      },
    ],
  };

  // Handle date selection
  const onDateChange = (event:any, selectedDate:any) => {
    setShowDatePicker(Platform.OS === "ios"); // Keep picker open on iOS, close on Android
    if (selectedDate) {
      setGoalDeadline(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!amount || !goalDeadline) {
      Alert.alert(
        "Error",
        "Amount and Goal Deadline are required fields."
      );
      return;
    }

    const newGoal = {
      userId: auth?.user?.id,
      goalType: longGoal ? "long_term" : "short_term",
      amount: parseInt(amount, 10),
      goalDeadline: goalDeadline.toISOString().split("T")[0], // Format as YYYY-MM-DD
    };

    try {
      const response = await axios.post(`${base_url}/user/add-goal`, newGoal);
      if (response.data.success) {
        Alert.alert("Success", "Goal added successfully!");
        setAmount("");
        setGoalDeadline(new Date());
        setLongGoal(false);
        fetchGoals(); // Refresh the goals list
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while adding the goal.");
      console.error("Error adding goal:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Add New Goal</ThemedText>

      <ThemedText style={styles.label}>Amount</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <ThemedText style={styles.label}>Goal Deadline</ThemedText>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerText}>
          {goalDeadline ? goalDeadline.toDateString() : "Select Deadline"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={goalDeadline}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <ThemedText style={styles.label}>Goal Type</ThemedText>
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[styles.statusButton, longGoal && styles.selectedStatusButton]}
          onPress={() => setLongGoal(true)}
        >
          <ThemedText style={longGoal && styles.selectedStatusText}>
            Long Term
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            !longGoal && styles.selectedStatusButton,
          ]}
          onPress={() => setLongGoal(false)}
        >
          <ThemedText style={!longGoal && styles.selectedStatusText}>
            Short Term
          </ThemedText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Goal</Text>
        </TouchableOpacity>

      <ThemedText style={styles.goalListTitle}>Your Goals Overview</ThemedText>
      {goals.length > 0 ? (
        <BarChart
          data={chartData}
          width={screenWidth - 40} // Adjust width as needed
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          verticalLabelRotation={0}
          style={styles.chart}
        />
      ) : (
        <Text style={styles.noGoals}>No goals found.</Text>
      )}
    </ThemedView>
  );
};

export default Goals;

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
      borderRadius: 10,
    },
    datePickerText: {
        marginVertical: 10,
      fontSize: 16,
      color: "#007AFF",
      marginBottom: 15,
    },
    statusContainer: {
        marginVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    statusButton: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 15, // Set border radius to 15
      marginHorizontal: 5,
      backgroundColor: "#fff", // Default background color
    },
    selectedStatusButton: {
      backgroundColor: "#007AFF",
      borderColor: "#007AFF",
    },
    statusText: { // Add this style for non-selected state text
        fontSize: 13, // Adjust font size as needed
        color: "#000", // Default text color
      },
    selectedStatusText: {
        fontSize: 14, // Same size as non-selected for consistency
        color: "#fff",
      },
    submitButton: {
        padding: 3,
        height: 45,
      width: '100%', // Set a fixed width or percentage for all buttons
      borderRadius: 15, // Set border radius to 15
      backgroundColor: "#007AFF", // Use the same color as selected status button
    //   marginVertical: 1, // Add some margin for spacing
    },
    submitButtonText: {
      color: "#fff",
      textAlign: "center",
      padding: 10,
    },
    goalListTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 10,
    },
    chart: {
      marginVertical: 10,
      borderRadius: 16,
    },
    noGoals: {
      textAlign: "center",
      color: "#888",
      marginVertical: 20,
    },
  });
  