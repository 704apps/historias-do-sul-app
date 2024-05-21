import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { RootStackParamList } from "../App";
import { AuthContext } from "../context/AuthContext";

const RegisterScreen: React.FC = () => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL

  const { saveUser } = useContext(AuthContext);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (name === "" || phone === "") {
      Alert.alert("Erro", "É necessário preencher todos os dados.");
      return;
    }
    setLoading(true);
    try {
      const data = {
        name: name,
        phone: phone,
      };
      const response = await axios.post(
        `${API_URL}/register`,
        data
      );
      saveUser(response.data);
      setName("");
      setPhone("");
      Alert.alert(
        "Cadastro realizado",
        "Seu cadastro foi realizado com sucesso!"
      );
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error) {
        console.log( `${API_URL}/register`)
        Alert.alert("Atenção", "Usuário já cadastrado");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../assets/images/logo704.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>Cadastro</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          <TextInputMask
            type={"cel-phone"}
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99) ",
            }}
            style={styles.input}
            placeholder="Celular"
            placeholderTextColor="#aaa"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#097E79",
  },
  containerWhite: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 24,
  },
  logo: {
    width: 150,
    height: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 24,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFE01D",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default RegisterScreen;
