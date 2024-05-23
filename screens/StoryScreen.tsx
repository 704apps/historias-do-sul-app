import React, { useContext, useEffect } from "react";
import {
  Alert,
  BackHandler,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneratorContext } from "../context/GeneratorContext";
import { useNavigation } from "@react-navigation/native";

const StoryScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation() as any;
  const { generatedStory } = useContext(GeneratorContext);
  //@ts-ignore


  useEffect(() => {
    const backAction = () => {
      Alert.alert("Atenção", "Deseja retornar?", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Sim", onPress: () => navigation.navigate("Home") },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/sky-bg.png")}
      resizeMode="cover"
      style={styles.image}
      blurRadius={10}
    >
      <SafeAreaView style={styles.container}>
        {generatedStory && (
          <View>
            {/* <View style={styles.containerTitle}>
              
              <Text style={styles.storyTitle}>{generatedStory.title}</Text>
            </View> */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {/*@ts-ignore */}
              <Text style={styles.storyText}>{generatedStory}</Text>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  container: {
    flex: 1,
    overflow: "hidden",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: "#f9f9f7",
    borderColor: "#d5d5d5",
    borderWidth: 2,
    borderRadius: 8,
  },
  containerTitle: {
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
    color: "#000",
  },
  storyText: {
    marginTop: 24,
    color: "#000",
    fontWeight: "500",
    lineHeight: 20,
    fontSize: 16,
    textAlign: "auto",
  },
});

export default StoryScreen;
