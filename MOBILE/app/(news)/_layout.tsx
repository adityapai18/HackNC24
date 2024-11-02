import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Image,
  Linking,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import axios from "axios";
import { market_news_url } from "@/constants/Urls";
import { ThemedView } from "@/components/ThemedView";

interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

interface ApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

const apiUrl = market_news_url;

const NewsScreen: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false); // State for refresh
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchNews = async () => {
    if (refreshing) return; // Prevent fetch if already refreshing
    setLoading(true); // Start loading before fetching
    try {
      const response = await axios.get<ApiResponse>(apiUrl, {
        params: {
          page: page,
          pageSize: 10, // Adjust page size as needed
        },
      });

      const { articles } = response.data; // Accessing the articles field
      setNewsData((prevData) => [...prevData, ...articles]);
      setLoading(false);

      // Check if there are more articles to load
      setHasMore(articles.length > 0);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing to true
    setPage(page + 1); // Reset to the first page
    setNewsData([]); // Clear current news data
    await fetchNews(); // Fetch news data
    setRefreshing(false); // Reset refreshing state
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  const loadMoreNews = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderItem = ({ item }: { item: NewsArticle }) => (
    <ThemedView style={styles.itemContainer}>
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      )}
      <ThemedText style={styles.title}>{item.title}</ThemedText>
      <ThemedText style={styles.description}>{item.description}</ThemedText>
      <ThemedText style={styles.link} onPress={() => Linking.openURL(item.url)}>
        Read more
      </ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.url + index} // Unique key for each item
          contentContainerStyle={styles.listContainer}
          onRefresh={onRefresh} // Refresh on pull down
          refreshing={refreshing} // Show refreshing indicator
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
    backgroundColor: "#121212", // Dark background for the list container
  },
  itemContainer: {
    marginBottom: 16,
    padding: 4,
    backgroundColor: "#1e1e1e", // Darker item background
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff", // Light text color for title
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: "#ffffff", // Light text color for description
  },
  link: {
    marginTop: 10,
    color: "#bb86fc", // Light purple for links
    textDecorationLine: "underline",
  },
});

export default NewsScreen;
