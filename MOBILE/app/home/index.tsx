import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { LineChart } from "react-native-chart-kit";
import { ProgressBar } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const HomeScreen = () => {
  const user = {
    name: "John Doe",
    username: "@johnny",
    profilePicture: "https://example.com/profile.jpg",
  };

  const router = useRouter();
  const daysLeft = 20;
  const totalDays = 30;
  const initialGoal = 100000;
  const savings = 60000;
  const progressPercentage = (savings / initialGoal) * 100;

  const linedata = {
    labels: Array.from({ length: 11 }, (_, i) => i * 3 + 1),
    datasets: [
      {
        data: [20, 45, 30, 70, 99, 43, 50, 60, 30, 40, 55],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView>
        <View style={styles.goalCard}>
            <ThemedText style={styles.cardTitle}>Your Goal</ThemedText>
            <ThemedText style={styles.largeNumber}>$60000</ThemedText>
            <ThemedText style={styles.smallNumber}>Out of $100000</ThemedText>
          </View>

        <View style={styles.progressContainer}>
          <ThemedText style={styles.keepGoingText}>Keep going {daysLeft} days to go!!</ThemedText>
          <AnimatedCircularProgress
            size={80}
            width={10}
            fill={progressPercentage}
            tintColor="#5576D9"
            backgroundColor="#BBC3F2"
            lineCap="round"
          >
            {(fill) => (
              <Text style={styles.progressText}>
                {Math.round(fill)}%
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>

        <View style={styles.expenditureSection}>
          <TouchableOpacity
            style={styles.insightsCard}
            onPress={() => console.log("Navigate to personalized insights")}
          >
            <Text style={styles.insightsText}>
              Tap for personalized expenditure insights            
            </Text>
          </TouchableOpacity>
          <ThemedText style={styles.sectionTitle}>Your Expenditure</ThemedText>

          <LineChart
            data={linedata}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisLabel={"$"}
            chartConfig={{
              backgroundColor: "#4D49BF",
              backgroundGradientFrom: "#2924A6",
              backgroundGradientTo: "#5576D9",
              decimalPlaces: 2,
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

      {/* Add Expense Button */}
      <TouchableOpacity
        style={styles.circularButton}
        onPress={() => router.push("/home/expense")}
      >
        <FontAwesome name="dollar" size={20} color="white" />
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

      {/* My Goals Button */}
      <TouchableOpacity
        style={styles.myGoalsButton}
        onPress={() => router.push("/home/goals")}
      >
        <FontAwesome name="flag" size={20} color="white" />
        <Text style={styles.buttonText}>My Goals</Text>
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
    backgroundColor: "#4D49BF",
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#EBEBF2", // light gray
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  largeNumber: {
    paddingTop: 50,
    fontSize: 70,
    textAlign: "left",
    paddingLeft: 5,
    marginTop: 10,
    fontWeight: "bold",
    color: "#007CC3", // dark blue
  },
  smallNumber: {
    fontWeight: "bold",
    color: "#5576D9", // accent blue
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: -8,
  },
  keepGoingText: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "#5576D9", // accent blue
  },
  progressText: {
    fontSize: 16,
    color: "#4D49BF", // primary dark blue
    fontWeight: "bold",
  },
  motivationalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#4D49BF",
  },
  expenditureSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    marginVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: -25,
    color: "#2924A6", // dark blue
  },
  progressBar: {
    marginVertical: 5,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#BBC3F2", // light complementary blue
  },
  circularButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4D49BF", // primary button blue
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    flexDirection: "row",
  },
  myGoalsButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#5576D9", // secondary button blue
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    flexDirection: "row",
  },
  buttonText: {
    color: "#EBEBF2", // light gray text for contrast
    fontSize: 16,
    marginLeft: 10,
    textAlign: "center",
  },
  insightsCard: {
    backgroundColor: "#5576D9", // Card background color
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 20,
    marginHorizontal: -25,
    width: Dimensions.get("window").width - 50,
  },
  insightsText: {
    color: "#EBEBF2", // Light text color for contrast
    fontSize: 16,
    textAlign: "center",
  },
  goalCard: {
    backgroundColor: 'rgba(255, 255, 255)', // Transparent background
    padding: 30, // Increase padding for more content spacing
    borderRadius: 10,
    width: Dimensions.get("window").width - 60, // Set a width to cover more screen space
    minHeight: 200, // Increase the minimum height
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    alignItems: "center",
    marginVertical: -8,
  },
  cardTitle: {
    fontSize: 20,
    color: "#4D49BF", // Title color
    fontWeight: "bold",
  },
  
});
