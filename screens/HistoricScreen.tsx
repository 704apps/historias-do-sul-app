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
  const [stories, setStories] = useState<Story[]>();

  const { user } = useContext(AuthContext);
  const userId = user?.id;

  useEffect(() => {
    async function handleStories() {
      try {
        const response = await axios.get(
          `https://api.historias-do-sul.zap704.com.br/users/${userId}/stories `
        );
        setStories(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error as AxiosError);
      }
    }
    handleStories();
  }, []);

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
