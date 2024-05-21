import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneratorContext } from "../context/GeneratorContext";

const StoryScreen = ({ route }: { route: any }) => {
  const { generatedStory } = useContext(GeneratorContext);
  //@ts-ignore
  const paragraphs = generatedStory?.content.split("\n\n");

  return (
    <SafeAreaView style={styles.container}>
      {generatedStory && (
        <View>
          <View style={styles.containerTitle}>
            {/*@ts-ignore */}
            <Text style={styles.storyTitle}>{generatedStory.title}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/*@ts-ignore */}
            <Text style={styles.storyText}>{paragraphs}</Text>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#097E79",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  containerTitle: {
    backgroundColor: "#557E79",
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  storyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
    position: "static",
  },
  storyText: {
    marginTop: 24,
    color: "#E0E0E0",
    fontWeight: "500",
    lineHeight: 20,
    fontSize: 16,
  },
});

export default StoryScreen;
