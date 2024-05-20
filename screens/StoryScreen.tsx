import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneratorContext } from "../context/GeneratorContext";

const StoryScreen = ({ route }: { route: any }) => {
  const {generatedStory} = useContext(GeneratorContext);

  return (
    <SafeAreaView style={styles.container}>
      {generatedStory && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/*@ts-ignore */}
          <Text style={styles.storyTitle}>{generatedStory.title}</Text>
          {/*@ts-ignore */}
          <Text style={styles.storyTitle}>{generatedStory.story}</Text>
        </ScrollView>
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
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  // ... outros estilos ...
  storyTitle: {

  },
  storyText: {
    color: "#E0E0E0",
    fontSize: 16,
  },
});

export default StoryScreen;