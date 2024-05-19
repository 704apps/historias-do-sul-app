import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StoryScreen = ({ route }: { route: any }) => {
  const { story } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.storyText}>{story}</Text>
      </ScrollView>
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
  storyText: {
    color: "#E0E0E0",
    fontSize: 16,
  },
});

export default StoryScreen;