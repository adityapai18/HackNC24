import { Image, StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView"; // Assuming you have a themed view component
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { LineChart } from "react-native-chart-kit"; // Import LineChart
import { ProgressBar } from 'react-native-paper'; // Import ProgressBar
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { dollar } from "@expo/vector-icons"; // Import Ionicons for the button icon

const HomeScreen = () => {
  const user = {
    name: "John Doe",
    username: "@johnny",
    profilePicture: "https://example.com/profile.jpg",
  };

  const daysLeft = 20; // Example: days left for the user's goal
  const totalDays = 30; // Total days for the goal

  const linedata = {
    labels: Array.from({ length: 11 }, (_, i) => i * 3 + 1),
    datasets: [
      {
        data: [20, 45, 30, 70, 99, 43, 50, 60, 30, 40, 55], // Example expenditure values for each 3-day interval
        strokeWidth: 2, // optional
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView>
        <ThemedView style={styles.header}>
          <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
        </ThemedView>

        <ThemedText style={styles.largeNumber}>60000</ThemedText>
        <ThemedText></ThemedText>
        <ThemedText></ThemedText>

        {/* Progress Bar */}
        <ProgressBar
          progress={daysLeft / totalDays} // Calculate the progress
          color="#2196F3" // Changed to blue color
          style={styles.progressBar}
        />

        <ThemedText style={styles.motivationalText}>Keep going {totalDays - daysLeft} days left!!</ThemedText>

        <View style={styles.expenditureSection}>
          <ThemedText style={styles.sectionTitle}>Your Expenditure</ThemedText>

          {/* Bezier Line Chart Implementation */}
          <LineChart
            data={linedata}
            width={Dimensions.get('window').width - 40} // Adjust width for padding
            height={220}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#2196F3', // Changed to blue gradient
              backgroundGradientTo: '#64B5F6', // Changed to a lighter blue gradient
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginLeft: -30,
            }}
          />
        </View>
      </ParallaxScrollView>

      {/* Circular Button */}
      <TouchableOpacity style={styles.circularButton}>
        <FontAwesome name="dollar" size={20} color="white" />
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
  },
  profilePicture: {
    width: 20,
    height: 20,
    borderRadius: 25,
  },
  largeNumber: {
    paddingTop: 50,
    fontSize: 70,
    textAlign: "left",
    paddingLeft: 5,
    marginTop: 10,
  },
  motivationalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  expenditureSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: -25,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    marginVertical: 5,
    height: 10,
    borderRadius: 10,
  },
  circularButton: {
    position: "absolute",
    bottom: 20,
    right: 20, // Positioning to the bottom right
    width: 150, // Increased width for text
    height: 50, // Increased height for text
    borderRadius: 25,
    backgroundColor: "#038aff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 10,
    flexDirection: "row", // Arrange items in a row
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10, // Space between icon and text
    textAlign: "center", // Center the text vertically
  },
});
