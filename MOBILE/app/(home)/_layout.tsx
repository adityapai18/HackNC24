import { Image, StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView"; // Assuming you have a themed view component
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { LineChart } from "react-native-chart-kit"; // Import LineChart
import { ProgressBar } from 'react-native-paper'; // Import ProgressBar

const HomeScreen = () => {
  const user = {
    name: "John Doe",
    username: "@johnny",
    profilePicture: "https://example.com/profile.jpg",
  };

  const daysLeft = 20; // Example: days left for the user's goal
  const totalDays = 30; // Total days for the goal

  const linedata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2, // optional
      },
    ],
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.header}>
        <View>
          <ThemedText style={styles.username}>{user.name}</ThemedText>
          <ThemedText style={styles.username}>{user.username}</ThemedText>
        </View>
        <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      </ThemedView>

      <ThemedText style={styles.largeNumber}>{daysLeft}</ThemedText>

      {/* Progress Bar */}
      <ProgressBar 
        progress={daysLeft / totalDays} // Calculate the progress
        color="#2196F3" // Changed to blue color
        style={styles.progressBar}
      />

      <ThemedText style={styles.motivationalText}>Keep going!</ThemedText>

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
          }}
        />
      </View>
    </ParallaxScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center", // Center items vertically
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  largeNumber: {
    fontSize: 60,
    textAlign: "left",
    paddingLeft: 10, // Reduced left padding
    marginTop: 10, // Reduced margin
  },
  motivationalText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  expenditureSection: {
    paddingHorizontal: 20, // Horizontal padding
    paddingBottom: 20, // Bottom padding
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    marginVertical: 10, // Add margin for spacing
    height: 20, // Specify height for the progress bar
    borderRadius: 10, // Rounded corners
  },
});


// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { ProgressBar } from 'react-native-paper';
// import { LineChart } from 'react-native-chart-kit';

// const HomePage = ({ user }) => {
//   // Sample data for the line chart
//   const data = {
//     labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
//     datasets: [{
//       data: [30, 45, 28, 80, 99, 43, 50, 60, 70, 100, 45, 30, 85, 90, 60, 70, 80, 75, 60, 55, 80, 90, 100, 70, 60, 50, 40, 30, 20, 10]
//     }]
//   };

//   // Calculate progress (example: 10 days left)
//   const daysLeft = 10;
//   const totalDays = 30; // Assuming the goal is set for 30 days
//   const progress = ((totalDays - daysLeft) / totalDays) * 100;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.userInfo}>
//           <Text style={styles.userName}>{user.name}</Text>
//           <Text style={styles.userUsername}>@{user.username}</Text>
//         </View>
//         <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
//       </View>

//       <Text style={styles.number}>${user.currentExpenditure}</Text>
      
//       {/* Progress Bar */}
//       <ProgressBar progress={progress / 100} color="#6200ee" style={styles.progressBar} />
      
//       <Text style={styles.motivationText}>Keep going!</Text>

//       <Text style={styles.expenditureTitle}>Your Expenditure</Text>
      
//       {/* Line Chart */}
//       <LineChart
//         data={data}
//         width={300} // from react-native
//         height={220}
//         yAxisLabel="$"
//         chartConfig={{
//           backgroundColor: "#e26a00",
//           backgroundGradientFrom: "#fb8c00",
//           backgroundGradientTo: "#ffa726",
//           decimalPlaces: 2, // optional, defaults to 2dp
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           style: {
//             borderRadius: 16
//           },
//           propsForDots: {
//             r: "6",
//             strokeWidth: "2",
//             stroke: "#ffa726"
//           }
//         }}
//         bezier
//         style={{
//           marginVertical: 8,
//           borderRadius: 16
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   userInfo: {
//     flexDirection: 'column'
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   userUsername: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   profilePicture: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   number: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   progressBar: {
//     height: 10,
//     borderRadius: 5,
//     marginVertical: 20,
//   },
//   motivationText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   expenditureTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
// });

// export default HomePage;