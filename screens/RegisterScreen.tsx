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
    const clearForm = () => {
      setPhone("");
      setName("");
    }
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
      clearForm();

      const message = response.data.operation === "register" ? "Seu cadastro foi realizado com sucesso!" : "Login efetuado com sucesso!"
      Alert.alert("Sucesso", message);
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao realizar o cadastro.");
      setLoading(false)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>Login | Cadastro</Text>
        <Text style={styles.message}>*Cadastre-se ou realize o Login com uma conta já existente.</Text>
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
            <Text style={styles.buttonText}>Login | Cadastro</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006db2",
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
    marginHorizontal: 'auto',
  },
  message: {
    width: "100%",
    color: "#FFE01D",
    fontSize: 12.9,
    fontWeight: "bold",
    marginBottom: 10,
    borderRadius: 5
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 10,
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
