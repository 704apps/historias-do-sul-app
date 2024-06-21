import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios, { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "../App";
import CardStories from "../components/CardStories";
import { AuthContext } from "../context/AuthContext";

interface Story {
  id: string;
  createdAt: string;
  content: string;
  title: string;
}

const HistoricScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/sky-bg.png")}
        resizeMode="cover"
        style={styles.background}
      />
      <ScrollView style={styles.stories}>
        {stories &&
          stories.map((story) => (
            <Pressable
              key={story.id}
              onPress={() => navigation.navigate("StoryDetail", { story })}
            >
              <CardStories
                date={story.createdAt}
                storyDescription={story.content}
              />
            </Pressable>
          ))}
      </ScrollView>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Generate")}>
        <Text style={styles.textButton}>CRIAR HISTÓRIA</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {    
    position: "relative",
  },
  background: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    height: 1000,
  },
  stories: {
    margin: 20,
    height: 670,
  },
  button: {
    width: "90%",
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "#006db2",
    padding: 20,
    zIndex: 1,
  },
  textButton: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HistoricScreen;