import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { RootStackParamList } from "../App";

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../assets/images/logo704.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/images/cards.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.relativeContainer}>
          <Text style={styles.title}>
            Crie agora a sua Aventura <Text style={styles.highlight}>Mágica</Text>
          </Text>
          <Image
            source={require("../assets/images/path.png")}
            style={styles.path}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.description}>
          Explore um universo de fantasia onde você pode ser o protagonista!
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.textButton}>Continue com o seu telefone</Text>
        </Pressable>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  relativeContainer: {
    position: "relative",
    marginTop: 5,
  },
  logo: {
    width: 400,
    height: 100,
  },
  image: {
    width: 400,
    height: 300,
    marginBottom: 20,
  },
  path: {
    width: 150,
    height: 20,
    position: "absolute",
    bottom: 2,
    right: -25,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  highlight: {
    color: "#FFE01D",
  },
  description: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    color: "rgb(243 244 246)",
  },
  button: {
    width: "100%",
    backgroundColor: "#FFE01D",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  textButton: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SplashScreen;