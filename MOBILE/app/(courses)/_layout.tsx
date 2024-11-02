import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Linking, Alert, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import rawCoursesData from "./courses.json"; // Import the JSON file
import { ThemedView } from "@/components/ThemedView";

// Define an interface for the course object
interface Course {
  "Course Name": string;
  University: string;
  "Difficulty Level": string;
  "Course Rating": number;
  "Course URL": string;
  "Course Description": string;
  Skills: string;
}

// Type the imported JSON data
const coursesData: Course[] = rawCoursesData as Course[];

const CourseLayout: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("");

  const filters = ["Investing", "Stocks", "MBA", "Finance", "Economics"]; // Define filter options

  useEffect(() => {
    // Initially filter courses to include only finance-related ones
    const financeCourses = coursesData.filter((course: Course) =>
      isFinanceRelated(course)
    );
    setCourses(financeCourses);
    setFilteredCourses(financeCourses);
  }, []);

  // Function to check if a course is finance-related
  const isFinanceRelated = (course: Course) => {
    const financeKeywords = ["finance", "investment", "financial", "economics", "accounting"];
    const text = `${course["Course Description"]} ${course.Skills}`.toLowerCase();
    return financeKeywords.some(keyword => text.includes(keyword));
  };

  // Function to handle search input and filter courses by course name
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterCourses(query, activeFilter);
  };

  // Function to handle filter button click
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter === activeFilter ? "" : filter); // Toggle filter off if already active
    filterCourses(searchQuery, filter === activeFilter ? "" : filter);
  };

  // Function to filter courses based on search query and selected filter
  const filterCourses = (query: string, filter: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const lowerCaseFilter = filter.toLowerCase();

    const filtered = courses.filter(course => {
      const courseText = `${course["Course Name"]} ${course["Course Description"]} ${course.Skills}`.toLowerCase();
      const matchesQuery = courseText.includes(lowerCaseQuery);
      const matchesFilter = lowerCaseFilter ? courseText.includes(lowerCaseFilter) : true;

      return matchesQuery && matchesFilter;
    });

    setFilteredCourses(filtered);
  };

  // Function to handle course item click and open the course URL
  const handleCourseClick = (url: string) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Unable to open the URL");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity onPress={() => handleCourseClick(item["Course URL"])}>
      <View style={styles.courseContainer}>
        <Text style={styles.courseTitle}>{item["Course Name"]}</Text>
        <Text style={styles.courseProvider}>University: {item.University}</Text>
        <Text style={styles.courseRating}>Rating: {item["Course Rating"]}</Text>
        <Text style={styles.courseSkills}>Skills Targeted: {item.Skills}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search courses by name..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilterButton
              ]}
              onPress={() => handleFilterClick(filter)}
            >
              <ThemedText>
                {filter}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item, index) => index.toString()} // Using index as key, assuming no unique ID field
        renderItem={renderCourseItem}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
};

export default CourseLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 16,
  },
  searchBar: {
    padding: 10,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
  },
  filterWrapper: {
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: "#ADD8E6",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#333",
  },
  activeFilterText: {
    color: "#fff",
  },
  courseContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  courseProvider: {
    fontSize: 14,
    color: "#555",
  },
  courseRating: {
    fontSize: 14,
    color: "#888",
  },
  courseSkills: {
    fontSize: 13,
    color: "#333",
    marginTop: 4,
  },
});
