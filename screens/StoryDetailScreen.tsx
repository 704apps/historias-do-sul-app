import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Pressable } from "react-native";
import { RootStackParamList } from "../App";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

type StoryDetailScreenRouteProp = RouteProp<RootStackParamList, "StoryDetail">;

const StoryDetailScreen = () => {
  const route = useRoute<StoryDetailScreenRouteProp>();
  const { story } = route.params;
  const navigation = useNavigation() as any;

  const navigationPage = () => {
    navigation.navigate("Home");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigationPage}>
              <View style={styles.textBack}>
                <Icon name="arrow-back-outline" style={styles.iconBack} />
                <Text>Voltar</Text>
              </View>
            </Pressable>
      <ImageBackground
        source={require("../assets/sky-bg.png")}
        resizeMode="cover"
        style={styles.background}
      />
      <ScrollView style={styles.storyContainer}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.date}>{new Date(story.createdAt).toLocaleString()}</Text>
        <Text style={styles.content}>{story.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  iconBack: {
    fontSize: 25,
  },
  textBack: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 5,
    flexDirection: "row",
  },
  background: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    height: 1000,
  },
  storyContainer: {
    borderRadius: 16,
    width: "90%",
    height: "85%",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#666",
    paddingLeft: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    padding: 20,
  },
});

export default StoryDetailScreen;