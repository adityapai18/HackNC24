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
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchNews = async () => {
    if (refreshing) return;
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(apiUrl, {
        params: {
          page: page,
          pageSize: 10,
        },
      });

      const { articles } = response.data;
      setNewsData((prevData) => [...prevData, ...articles]);
      setLoading(false);
      setHasMore(articles.length > 0);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(page + 1);
    setNewsData([]);
    await fetchNews();
    setRefreshing(false);
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
    <ThemedView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.url + index}
          contentContainerStyle={styles.listContainer}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 8,
    backgroundColor: "#f5f5f5",
  },
  itemContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200, // Increased height for a larger image
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333333",
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: "#555555",
  },
  link: {
    marginTop: 10,
    color: "#0066cc",
    // fontWeight: "bold", // Changed to bold instead of underline
  },
});

export default NewsScreen;
