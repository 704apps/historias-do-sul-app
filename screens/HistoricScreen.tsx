import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import CardStories from "../components/CardStories";
import axios, { AxiosError } from "axios";
import { AuthContext } from "../context/AuthContext";

interface Story {
  id: string;
  createdAt: string;
  content: string;
  title: string;
}

const HistoricScreen = () => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [stories, setStories] = useState<Story[]>();

  const { user } = useContext(AuthContext);
  const userId = user?.id;

  useEffect(() => {
    async function handleStories() {
      try {
        const response = await axios.get(
          `${API_URL}/users/${userId}/stories`
        );
        const sortedStories = response.data.sort((a: Story, b: Story) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setStories(sortedStories);
      } catch (error) {
        console.error("Erro na requisição:", error as AxiosError);
      }
    }
    handleStories();
  }, [stories]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {stories &&
          stories.map((story) => (
            <CardStories
              key={story.id}
              date={story.createdAt}
              storyDescription={story.content}
              title={story.title}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: "relative",
  },
});

export default HistoricScreen;